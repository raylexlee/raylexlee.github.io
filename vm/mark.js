const idCode = n => 'code'+n;
const idFb = n => 'fb'+n;
const id = { 
   init() { this.n = 0 }, 
   get next() { this.n++; return this.n }, 
   get code() { return idCode(this.n) }, 
   get fb() { return idFb(this.n) }
}
id.init()
        function copyText(n) {

            const icon = document.querySelector('.copy-icon');
            const textToCopy = document.getElementById(idCode(n)).value;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const feedback = document.getElementById(idFb(n));
                feedback.classList.add('show');
                setTimeout(() => {
                    feedback.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text. Please try again.');
            });
        }
    
        // ==================== Simple Markdown Parser ====================
        const markdownParser = {
            // Main parse function
            parse: function(text) {
                if (!text) return '';
                
                // Parse code blocks FIRST - with NO escaping for macros
                text = this.parseCodeBlocks(text);
                
                // Parse block elements (but avoid messing with code blocks)
                text = this.parseHeaders(text);
                text = this.parseBlockquotes(text);
                text = this.parseHorizontalRules(text);
                text = this.parseLists(text);
                text = this.parseTables(text);
                
                // Parse inline elements (but avoid messing with code blocks)
                text = this.parseInlineFormatting(text);
                text = this.parseLinks(text);
                text = this.parseImages(text);
                
                // Parse paragraphs
                text = this.parseParagraphs(text);
                
                return text;
            },

            // Parse code blocks - NO ESCAPING, preserves exact macro text
            parseCodeBlocks: function(text) {
                // Fenced code blocks with optional language
                text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
                    // Generate unique ID for this code block
                    const Id = id.next;
                    const language = lang ? lang : 'macro';
                    
                    // Create code block with copy button - PRESERVE EXACT CODE
                    return `<div class="code-block">
    <svg class="copy-icon" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"  onclick="copyText(${Id})">
        <path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"/>
    </svg>
    
    <div class="feedback" id="${idFb(Id)}">Copied!</div>
 <textarea id="${idCode(Id)}" readonly>${code}</textarea>
                            </div>`;
                });
               return text;
            }, 

            // Parse headers
            parseHeaders: function(text) {
                text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
                text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
                text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
                text = text.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
                text = text.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
                text = text.replace(/^###### (.*$)/gm, '<h6>$1</h6>');
                
                // Setext style headers
                text = text.replace(/^(.*)\n={3,}$/gm, '<h1>$1</h1>');
                text = text.replace(/^(.*)\n-{3,}$/gm, '<h2>$1</h2>');
                
                return text;
            },

            // Parse blockquotes
            parseBlockquotes: function(text) {
                return text.replace(/(?:^|\n)>(.*?)(?=\n|$)/gs, (match, content) => {
                    return `\n<blockquote>${content.trim()}</blockquote>\n`;
                });
            },

            // Parse horizontal rules
            parseHorizontalRules: function(text) {
                return text.replace(/^([-*_]){3,}\s*$/gm, '<hr>');
            },

            // Parse lists
            parseLists: function(text) {
                // Unordered lists
                text = text.replace(/(?:^|\n)[*+-] .*(?:\n[*+-] .*)*/g, (match) => {
                    const items = match.split('\n').map(line => {
                        const content = line.replace(/^[*+-] /, '').trim();
                        return `<li>${content}</li>`;
                    }).join('');
                    return `\n<ul>${items}</ul>\n`;
                });
                
                // Ordered lists
                text = text.replace(/(?:^|\n)\d+\. .*(?:\n\d+\. .*)*/g, (match) => {
                    const items = match.split('\n').map(line => {
                        const content = line.replace(/^\d+\. /, '').trim();
                        return `<li>${content}</li>`;
                    }).join('');
                    return `\n<ol>${items}</ol>\n`;
                });
                
                return text;
            },

            // Parse tables
            parseTables: function(text) {
                const tableRegex = /\n(.+)\n\|?(?:\|.*)+\|?\n/;
                return text.replace(tableRegex, (match, headerRow) => {
                    const rows = match.trim().split('\n');
                    if (rows.length < 2) return match;
                    
                    const headers = rows[0].split('|').filter(cell => cell.trim()).map(cell => `<th>${cell.trim()}</th>`);
                    const dataRows = rows.slice(2).map(row => {
                        const cells = row.split('|').filter(cell => cell.trim()).map(cell => `<td>${cell.trim()}</td>`);
                        return `<tr>${cells.join('')}</tr>`;
                    });
                    
                    return `\n<table><thead><tr>${headers.join('')}</tr></thead><tbody>${dataRows.join('')}</tbody></table>\n`;
                });
            },

            // Parse inline formatting (but skip if inside code blocks)
            parseInlineFormatting: function(text) {
                // Bold
                text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
                
                // Italic
                text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                
                // Inline code
                text = text.replace(/`(.*?)`/g, '<code>$1</code>');
                
                // Strikethrough
                text = text.replace(/~~(.*?)~~/g, '<del>$1</del>');
                
                return text;
            },

            // Parse links
            parseLinks: function(text) {
                // [text](url)
                text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
                
                // Plain URLs
                text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
                
                return text;
            },

            // Parse images
            parseImages: function(text) {
                text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
                return text;
            },

            // Parse paragraphs
            parseParagraphs: function(text) {
                const lines = text.split('\n');
                let inParagraph = false;
                let paragraphs = [];
                
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    
                    if (line === '') {
                        inParagraph = false;
                        continue;
                    }
                    
                    if (line.startsWith('<h') || line.startsWith('<div class="code-block') || 
                        line.startsWith('<pre') || line.startsWith('<ul') || 
                        line.startsWith('<ol') || line.startsWith('<blockquote') || 
                        line.startsWith('<table') || line.startsWith('<hr')) {
                        paragraphs.push(line);
                        inParagraph = false;
                        continue;
                    }
                    
                    if (!inParagraph) {
                        paragraphs.push('<p>' + line);
                        inParagraph = true;
                    } else {
                        paragraphs[paragraphs.length - 1] += ' ' + line;
                    }
                }
                
                if (inParagraph && paragraphs.length > 0) {
                    paragraphs[paragraphs.length - 1] += '</p>';
                }
                
                return paragraphs.join('\n');
            }
        };

        // ==================== URL Parameter Handling ====================
        function getUrlParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        // ==================== File Loading ====================
        async function loadMarkdownFile(filename) {
            const contentDiv = document.getElementById('content');
            
            try {
                contentDiv.innerHTML = '';
                
                const mdFilename = filename.endsWith('.md') ? filename : filename + '.md';
                
                const response = await fetch(mdFilename);
                
                if (!response.ok) {
                    throw new Error(`File not found: ${mdFilename}`);
                }
                
                const markdownText = await response.text();
                
                // Parse markdown to HTML - with macros preserved
                const htmlContent = markdownParser.parse(markdownText);
                
                contentDiv.innerHTML = `<div class="markdown-body">${htmlContent}</div>`;
                document.title = `${mdFilename}`;
                
            } catch (error) {
                contentDiv.innerHTML = `
                    <div class="error">
                        <h3>⚠️ Error Loading File</h3>
                        <p>${error.message}</p>
                        <p>Try one of these options:</p>
                        <div class="error-actions">
                            <a href="?md=README">View README.md</a>
                            <a href="#" onclick="window.location.reload()">Reload Page</a>
                        </div>
                    </div>
                `;
            } finally {
              console.log('done!');
            }
        }

        // ==================== Initialize ====================
        async function init() {
            const mdParam = getUrlParameter('md');
            const filename = mdParam || 'README';
            
            await loadMarkdownFile(filename);
        }

        document.addEventListener('DOMContentLoaded', init);
        window.addEventListener('popstate', init);
    
