import os

css_additions = """
/* NEW GLASSMORPHISM AND BOOK SHOWCASE STYLES */
.accent-text { color: var(--color-highlight); }
.glass-bg {
  background: linear-gradient(135deg, rgba(248, 243, 237, 0.4) 0%, rgba(228, 231, 235, 0.4) 100%);
  position: relative;
  overflow: hidden;
}
:root[data-theme="dark"] .glass-bg {
  background: linear-gradient(135deg, rgba(15, 23, 36, 0.4) 0%, rgba(30, 41, 59, 0.4) 100%);
}

.glass {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: #fff !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
}
:root[data-theme="dark"] .glass-card {
  background: rgba(30, 41, 59, 0.8) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.hero-label {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: var(--space-md);
  backdrop-filter: blur(8px);
}

.hero-bg-anim {
  position: absolute;
  top: -50%;
  left: 50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(0, 119, 255, 0.15) 0%, transparent 60%);
  transform: translateX(-50%);
  z-index: 1;
  animation: pulseBg 12s infinite alternate ease-in-out;
}
@keyframes pulseBg {
  0% { transform: scale(1) translateX(-50%); }
  100% { transform: scale(1.2) translateX(-50%); }
}

.hero-profile .profile-img-container {
  overflow: hidden;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  margin: 0 auto;
  border: 4px solid var(--color-bg);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.hero-profile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none !important;
  border-radius: 0 !important;
  transition: transform 0.3s;
}
.hero-profile:hover img {
  transform: scale(1.05);
}

/* BOOK SHOWCASE */
.book-container {
  display: flex;
  gap: var(--space-xl);
  align-items: center;
  background: rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: var(--space-xl);
  box-shadow: 0 12px 40px rgba(11,37,63,0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.4);
}
:root[data-theme="dark"] .book-container {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(255,255,255,0.05);
}
.book-content { flex: 1; }
.book-cover-wrapper {
  perspective: 1000px;
  flex-shrink: 0;
}
.book-cover {
  width: 250px;
  height: 350px;
  background: linear-gradient(135deg, var(--color-primary), #1a3c5e);
  border-radius: 4px 12px 12px 4px;
  box-shadow: inset 4px 0 10px rgba(0,0,0,0.2), 15px 15px 30px rgba(0,0,0,0.2);
  color: white;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  transform: rotateY(-15deg);
  transition: transform 0.4s ease;
}
.book-cover:hover {
  transform: rotateY(-5deg) translateY(-5px);
  box-shadow: inset 4px 0 10px rgba(0,0,0,0.2), 20px 20px 40px rgba(0,0,0,0.3);
}
.book-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.book-subtitle {
  font-size: 14px;
  color: var(--color-highlight);
  font-family: var(--font-english);
  flex-grow: 1;
}
.book-author {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}
.chapter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.chapter-list li { margin-bottom: 8px; }
.chapter-list a {
  display: block;
  padding: 10px 14px;
  background: var(--color-bg);
  border-radius: 8px;
  font-weight: 500;
  color: var(--color-primary);
  border: 1px solid rgba(11,37,63,0.08);
  transition: all 0.2s ease;
}
:root[data-theme="dark"] .chapter-list a {
  background: var(--color-neutral);
  color: var(--color-text);
  border-color: rgba(255,255,255,0.05);
}
.chapter-list a:hover {
  background: var(--color-accent);
  color: #fff;
  transform: translateX(4px);
}
@media(max-width: 800px) {
  .book-container { flex-direction: column; text-align: center; }
  .book-container .flex { justify-content: center; }
}

"""

with open("brand.css", "a", encoding="utf-8") as f:
    f.write(css_additions)

print("CSS appended to brand.css")
