import sys

with open(r'C:\Users\tahet\Documents\GitHub\hariss-web\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = """        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-12">
            <a href="index.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-accent cursor-hover magnetic"
                data-magnetic-strength="15">Accueil</a>
            <a href="services.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-accent transition-colors cursor-hover magnetic"
                data-magnetic-strength="15">Services</a>
            <a href="portfolio.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-accent transition-colors cursor-hover magnetic"
                data-magnetic-strength="15">Portfolio</a>
            <a href="contact.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-accent transition-colors cursor-hover magnetic"
                data-magnetic-strength="15">Contact</a>
        </nav>"""

replacement = """        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-10">
            <a href="index.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-accent cursor-hover magnetic"
                data-magnetic-strength="15">Accueil</a>
            <a href="services.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-accent transition-colors cursor-hover magnetic"
                data-magnetic-strength="15">Services</a>
            <a href="portfolio.html"
                class="text-xs uppercase tracking-[0.2em] font-medium text-white hover:text-accent transition-colors cursor-hover magnetic"
                data-magnetic-strength="15">Portfolio</a>
            <a href="contact.html" 
                class="group relative inline-flex items-center justify-center px-6 py-3 border border-white/20 text-xs font-syne uppercase tracking-wider text-white overflow-hidden cursor-hover magnetic rounded-full hover:border-accent transition-colors duration-500" 
                data-magnetic-strength="20">
                <span class="relative z-10 transition-colors group-hover:text-black font-bold">Contacter</span>
                <div class="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out z-0"></div>
            </a>
        </nav>"""

# Normalize newlines
target = target.replace('\r\n', '\n')
html = html.replace('\r\n', '\n')

res = html.replace(target, replacement)

with open(r'C:\Users\tahet\Documents\GitHub\hariss-web\index.html', 'w', encoding='utf-8') as f:
    f.write(res)
