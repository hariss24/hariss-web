import sys

with open(r'C:\Users\tahet\Documents\GitHub\hariss-web\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_html = """            <!-- Scrollytelling Methodology (Replaces Portfolio) -->
            <section id="methodology-scroll" class="relative w-full bg-pitch text-white" style="height: 400vh;">
                <!-- Sticky Container -->
                <div class="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    
                    <!-- Progress Bar (Desktop only, minimal) -->
                    <div class="absolute top-1/2 left-6 md:left-12 transform -translate-y-1/2 w-[2px] h-32 bg-white/10 z-30 hidden md:block">
                        <div id="method-progress" class="w-full bg-accent absolute top-0 left-0 transition-none will-change-[height]" style="height: 0%;"></div>
                    </div>

                    <!-- Track container (Full width to allow horizontal shift) -->
                    <div id="method-track" class="w-full h-full flex items-center will-change-transform" style="transform: translate3d(0,0,0);">
                        
                        <!-- Step 1 -->
                        <div class="w-screen h-full flex-shrink-0 flex items-center justify-center method-step px-6 md:px-24">
                            <div class="max-w-3xl w-full method-content transform transition-transform duration-300">
                                <p class="font-syne text-accent text-xl md:text-2xl mb-4 md:mb-6 uppercase tracking-widest font-bold">01. Approche</p>
                                <h3 class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Faire le <br><span class="font-serif italic text-white/50 lowercase tracking-normal">vide.</span>
                                </h3>
                                <p class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Un site web classique empile l'information jusqu'à l'indigestion. Mon processus commence par la suppression de tout ce qui est superflu pour ne conserver que l'essence absolue de votre message.
                                </p>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div class="w-screen h-full flex-shrink-0 flex items-center justify-center method-step px-6 md:px-24 opacity-20">
                            <div class="max-w-3xl w-full method-content transform scale-[0.8] transition-transform duration-300">
                                <p class="font-syne text-accent text-xl md:text-2xl mb-4 md:mb-6 uppercase tracking-widest font-bold">02. Design</p>
                                <h3 class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Créer le <br><span class="font-serif italic text-white/50 lowercase tracking-normal">choc.</span>
                                </h3>
                                <p class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Une fois l'espace libéré, j'injecte des éléments au contraste architectural. De la typographie démesurée, des micro-interactions magnétiques et un équilibre brutal inspiré de l'art moderne.
                                </p>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="w-screen h-full flex-shrink-0 flex items-center justify-center method-step px-6 md:px-24 opacity-20">
                            <div class="max-w-3xl w-full method-content transform scale-[0.8] transition-transform duration-300">
                                <p class="font-syne text-accent text-xl md:text-2xl mb-4 md:mb-6 uppercase tracking-widest font-bold">03. Impact</p>
                                <h3 class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Imprimer <br><span class="font-serif italic text-white/50 lowercase tracking-normal">l'esprit.</span>
                                </h3>
                                <p class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Le visiteur ne défile plus des pages sans âme, il explore une vision. Chaque scroll, chaque survol devient mémorable. On ne vend plus un service : on impose une autorité évidente.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
"""

out = lines[:304] + [new_html] + lines[386:]

with open(r'C:\Users\tahet\Documents\GitHub\hariss-web\index.html', 'w', encoding='utf-8') as f:
    f.writelines(out)
