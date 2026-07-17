function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // 10 seconds to wait for lock to avoid race conditions in GS
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];
    
    // Parse the JSON payload
    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Invalid JSON payload"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var action = payload.action;

    // Retrieve headers (first row)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // ACTION: Fetch booked slots
    if (action === "get_booked_slots") {
      var dateIdx = headers.indexOf("date");
      var timeIdx = headers.indexOf("time");
      var statusIdx = headers.indexOf("status");
      
      var bookedSlots = [];
      
      if (dateIdx > -1 && timeIdx > -1 && sheet.getLastRow() > 1) {
        // Fetch all rows excluding header
        var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        
        for (var i = 0; i < data.length; i++) {
          var rowStatus = statusIdx > -1 ? data[i][statusIdx] : 'Confirmed';
          if (rowStatus !== 'Cancelled') {
            bookedSlots.push({
              date: data[i][dateIdx],
              time: data[i][timeIdx]
            });
          }
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        bookedSlots: bookedSlots
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ACTION: Save booking with duplicate protection
    if (action === "save_booking") {
      // Step 1: Check for duplicates
      var dateIdx = headers.indexOf("date");
      var timeIdx = headers.indexOf("time");
      var statusIdx = headers.indexOf("status");
      
      if (dateIdx > -1 && timeIdx > -1 && sheet.getLastRow() > 1) {
        var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
        for (var i = 0; i < data.length; i++) {
          var rowStatus = statusIdx > -1 ? data[i][statusIdx] : 'Confirmed';
          if (rowStatus !== 'Cancelled' && data[i][dateIdx] === payload.date && data[i][timeIdx] === payload.time) {
            return ContentService.createTextOutput(JSON.stringify({
              success: false,
              error: "duplicate",
              message: "This slot was just booked by another user."
            })).setMimeType(ContentService.MimeType.JSON);
          }
        }
      }
      
      // Step 2: Append new booking
      var newRow = [];
      for (var j = 0; j < headers.length; j++) {
        var header = headers[j];
        if (header.length > 0) {
          // If the payload has the header, use it, else empty string
          newRow.push(payload[header] !== undefined ? payload[header] : "");
        }
      }
      
      sheet.appendRow(newRow);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Booking saved successfully"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Fallback for missing action
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Missing or invalid action"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
