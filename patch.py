import os, re

dir_path = r'e:\KK tech\src'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for handleMouseMove inside PremiumCard or InteractivePartnerCard
    # It usually looks like:
    # const handleMouseMove = (e: React.MouseEvent) => {
    #   if (!cardRef.current) return;
    
    # We want to insert the bypass if it doesn't exist
    bypass = "    if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;\n"
    
    if "const handleMouseMove = (e: React.MouseEvent) => {\n    if (!cardRef.current) return;" in content:
        content = content.replace(
            "const handleMouseMove = (e: React.MouseEvent) => {\n    if (!cardRef.current) return;",
            f"const handleMouseMove = (e: React.MouseEvent) => {{\n{bypass}    if (!cardRef.current) return;"
        )
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, _, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
