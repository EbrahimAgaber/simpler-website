import pypdf
import os
import json

reader = pypdf.PdfReader('Data-Driven Process Engineering Machine learning for chemical engineers.pdf')
full_text = ""
for i in range(len(reader.pages)):
    full_text += reader.pages[i].extract_text() + "\n"

# A simple heuristic: split by "Chapter " or numbering if that's how it's done. 
# Let's save the full text first so we can analyze it.
with open('full_text.txt', 'w', encoding='utf-8') as f:
    f.write(full_text)

print("Text extracted to full_text.txt")
