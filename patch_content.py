import io

with open(r'C:\Users\tahet\Documents\GitHub\hariss-web\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

html = "".join(lines)

rep1_old = """                    <p
                        class="font-inter text-accent uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 md:mb-8 reveal-text">
                        <span class="line block">Strategy & Digital Experiences</span>
                    </p>

                    <h1 class="text-huge font-syne font-bold uppercase tracking-tighter text-white reveal-text">
                        <span class="line block">We build</span>
                    </h1>
                    <h1
                        class="text-huge font-syne font-bold uppercase tracking-tighter text-white reveal-text -mt-1 md:-mt-8 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 flex-wrap">
                        <span class="line block text-surface shrink-0"
                            style="-webkit-text-stroke: 1px rgba(255,255,255,0.8);">Digital</span>
                        <span
                            class="line block font-serif italic text-accent normal-case tracking-normal shrink-0">masterpieces.</span>
                    </h1>"""

rep1_new = """                    <p
                        class="font-inter text-accent uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 md:mb-8 reveal-text">
                        <span class="line block">Création de sites internet sur-mesure</span>
                    </p>

                    <h1 class="text-huge font-syne font-bold uppercase tracking-tighter text-white reveal-text">
                        <span class="line block">Je crée</span>
                    </h1>
                    <h1
                        class="text-huge font-syne font-bold uppercase tracking-tighter text-white reveal-text -mt-1 md:-mt-8 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 flex-wrap">
                        <span class="line block text-surface shrink-0"
                            style="-webkit-text-stroke: 1px rgba(255,255,255,0.8);">Des sites</span>
                        <span
                            class="line block font-serif italic text-accent normal-case tracking-normal shrink-0">performants.</span>
                    </h1>"""

rep2_old = """                            <p class="font-inter text-gray-400 font-light text-base md:text-xl leading-relaxed">
                                <span class="line block">On ne fait pas de sites internet.</span>
                                <span class="line block">On crée des expériences immersives qui pulvérisent</span>
                                <span class="line block">vos concurrents et marquent les esprits.</span>
                            </p>"""

rep2_new = """                            <p class="font-inter text-gray-400 font-light text-base md:text-xl leading-relaxed">
                                <span class="line block">Développeur freelance CMS, je conçois</span>
                                <span class="line block">des sites web sur-mesure pour les</span>
                                <span class="line block">PME, artisans et indépendants.</span>
                            </p>"""

rep3_old = """                            <h3
                                class="font-syne text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter reveal-text">
                                <span class="line block">Le web est saturé</span>
                                <span class="line block text-gray-300">de designs invisibles.</span>
                                <span class="line block font-serif italic font-normal mt-4 md:mt-6 text-black">Il est
                                    temps d'émerger.</span>
                            </h3>
                            <div class="mt-12 md:mt-16 max-w-2xl reveal-text">
                                <p class="font-inter text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                                    <span class="line inline-block">Les petites entreprises manquent de temps</span>
                                    <span class="line inline-block">et d'expertise pour briller en ligne. Mon rôle
                                        est</span>
                                    <span class="line inline-block">de vous armer d'une plateforme radicalement </span>
                                    <span class="line inline-block">différente, conçue pour convertir.</span>
                                </p>
                            </div>"""

rep3_new = """                            <h3
                                class="font-syne text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tighter reveal-text">
                                <span class="line block">Votre activité</span>
                                <span class="line block text-gray-300">mérite mieux.</span>
                                <span class="line block font-serif italic font-normal mt-4 md:mt-6 text-black">Démarquez-vous localement.</span>
                            </h3>
                            <div class="mt-12 md:mt-16 max-w-2xl reveal-text">
                                <p class="font-inter text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                                    <span class="line inline-block">Les PME et artisans manquent souvent</span>
                                    <span class="line inline-block">de temps pour soigner leur vitrine web.</span>
                                    <span class="line inline-block">En tant qu'indépendant, je vous aide à vous</span>
                                    <span class="line inline-block">développer avec un site moderne et sans friction.</span>
                                </p>
                            </div>"""

rep4_old = """                                    01. Approche</p>
                                <h3
                                    class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Faire le <br><span
                                        class="font-serif italic text-white/50 lowercase tracking-normal">vide.</span>
                                </h3>
                                <p
                                    class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Un site web classique empile l'information jusqu'à l'indigestion. Mon processus
                                    commence par la suppression de tout ce qui est superflu pour ne conserver que
                                    l'essence absolue de votre message.
                                </p>"""

rep4_new = """                                    01. Approche</p>
                                <h3
                                    class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Aller à <br><span
                                        class="font-serif italic text-white/50 lowercase tracking-normal">l'essentiel.</span>
                                </h3>
                                <p
                                    class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Un site vitrine performant va droit au but. Mon approche consiste à clarifier votre offre et fluidifier le parcours utilisateur pour que vos futurs clients trouvent l'information en un instant.
                                </p>"""

rep5_old = """                                    02. Design</p>
                                <h3
                                    class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Créer le <br><span
                                        class="font-serif italic text-white/50 lowercase tracking-normal">choc.</span>
                                </h3>
                                <p
                                    class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Une fois l'espace libéré, j'injecte des éléments au contraste architectural. De la
                                    typographie démesurée, des micro-interactions magnétiques et un équilibre brutal
                                    inspiré de l'art moderne.
                                </p>"""

rep5_new = """                                    02. Conception</p>
                                <h3
                                    class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    CMS et <br><span
                                        class="font-serif italic text-white/50 lowercase tracking-normal">autonomie.</span>
                                </h3>
                                <p
                                    class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Je construis votre site sur un CMS robuste et simple d'utilisation, couplé à un design premium. Résultat : une plateforme que vous pourrez facilement mettre à jour vous-même, sans aucun surcoût.
                                </p>"""

rep6_old = """                                    03. Impact</p>
                                <h3
                                    class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Imprimer <br><span
                                        class="font-serif italic text-white/50 lowercase tracking-normal">l'esprit.</span>
                                </h3>
                                <p
                                    class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Le visiteur ne défile plus des pages sans âme, il explore une vision. Chaque scroll,
                                    chaque survol devient mémorable. On ne vend plus un service : on impose une autorité
                                    évidente.
                                </p>"""

rep6_new = """                                    03. Lancement</p>
                                <h3
                                    class="font-syne text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                                    Prêt à <br><span
                                        class="font-serif italic text-white/50 lowercase tracking-normal">convertir.</span>
                                </h3>
                                <p
                                    class="font-inter text-base md:text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                                    Avec un site rapide, optimisé pour le référencement (SEO) naturel et adapté aux mobiles, vous gagnez en crédibilité locale et attirez de nouveaux clients de manière stable et pérenne.
                                </p>"""

for o, n in [(rep1_old, rep1_new), (rep2_old, rep2_new), (rep3_old, rep3_new), (rep4_old, rep4_new), (rep5_old, rep5_new), (rep6_old, rep6_new)]:
    html = html.replace(o, n)

with open(r'C:\Users\tahet\Documents\GitHub\hariss-web\index.html', 'w', encoding='utf-8') as f:
    f.write(html)
