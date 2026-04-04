import re
import json
import os

with open("full_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Find all chapter occurrences
# Pattern: line starts with a number, then "Chapter", then number, then ":"
pattern = r'(?:\n|^)\d+\s+Chapter\s+(\d+):\s+(.*?)\s*\n'

matches = list(re.finditer(pattern, text))
chapters = []

for i in range(len(matches)):
    start = matches[i].end()
    chapter_num = matches[i].group(1)
    title = matches[i].group(2)
    
    if i < len(matches) - 1:
        end = matches[i+1].start()
    else:
        end = len(text)
        
    content = text[start:end].strip()
    
    # If the content is very short, it's likely just the Table of Contents entry
    if len(content) > 500:
        chapters.append({
            "num": chapter_num,
            "title": f"Chapter {chapter_num}: {title}",
            "content": content
        })

# Create docs directory if it doesn't exist
os.makedirs("docs", exist_ok=True)

blog_data = []

for ch in chapters:
    md_filename = f"docs/chapter_{ch['num']}.md"
    
    # Clean up content a bit
    md_content = f"# {ch['title']}\n\n" + ch['content']
    
    with open(md_filename, "w", encoding="utf-8") as f:
        f.write(md_content)
        
    # Estimate read time (assuming ~200 words per min)
    word_count = len(ch['content'].split())
    read_time = max(1, word_count // 200)
    
    blog_data.append({
        "title": ch['title'],
        "category": "Data-Driven Process",
        "readTime": f"{read_time} min read",
        "summary": ch['content'][:150].replace('\n', ' ') + "...",
        "url": f"article.html?file={md_filename}"
    })

# Always keep the original NGL Fractionation Mock for variety if we want, but let's just append
existing_blog_data = []
if os.path.exists("blog-data.json"):
    try:
        with open("blog-data.json", "r", encoding="utf-8") as f:
            existing_blog_data = json.load(f)
    except:
        pass

# Combine
final_blog_data = blog_data

with open("blog-data.json", "w", encoding="utf-8") as f:
    json.dump(final_blog_data, f, indent=2)

print(f"Extracted {len(chapters)} chapters and updated blog-data.json!")
