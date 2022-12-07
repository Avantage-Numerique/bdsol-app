
import Button from "@/src/common/FormElements/Button/Button";
import ArrowButton from "@/src/common/FormElements/ArrowButton/ArrowButton";


const DesignSystem = () => {
    return (
        <>
            {/* THEMES COLOR */}
            <div>
                <h1>Themes Colors</h1>
                <h2>Basic</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-primary text-white">primary</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-primarylight text-dark">primarylight</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-purplelight text-dark">purplelight</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-purplelighter text-dark">purplelighter</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-pink text-dark">pink</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-pink-100 text-dark">pink-100</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-blue2 text-dark">blue2</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-blue3 text-dark">blue3</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-blue4 text-dark">blue4</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-secondary text-white">secondary</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-danger text-white">danger</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-light text-dark">light</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-dark text-white">dark</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-white text-dark">white</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-black text-white">black</div>
                        </div>
                    </div>
                </div>

                <h2>Successes</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-success text-white">success</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-successlighter text-white">successlighter</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-successDarker text-white">successDarker</div>
                        </div>
                    </div>
                </div>

                <h2>Taxonomies</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-accepted text-white">accepted</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-rejected text-white">rejected</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-pending text-white">pending</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-deprecated text-white">decrepated</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-occupations text-white">occupations</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-skills text-white">skills</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-domains text-white">domains</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-abilities text-white">abilities</div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 mb-3 bg-general-tag text-white">general-tag</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* BUTTONS */}
            <div>
                <h1>Button</h1>

                <h2>Default</h2>
                <Button> Button Default </Button>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<Button>'}</span>
                    </code>
                </pre>

                <h2>Size</h2>

                {/* size */}
                <div>
                    <Button size="slim"> Button Slim </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button size="slim">'}</span>
                        </code>
                    </pre>

                    <Button size="large"> Button Large </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button size="large">'}</span>
                        </code>
                    </pre>


                    <Button size="large-100"> Button Large-100 </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button size="large-100">'}</span>
                        </code>
                    </pre>

                </div>

                <h2>Disabled</h2>

                {/* disabled */}
                <div>
                    <Button disabled> Button Disabled </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button disabled>'}</span>
                        </code>
                    </pre>
                </div>


                <h2>Color</h2>
                <p>Utilise les $theme-colors</p>
                {/* color */}
                <div>
                    <Button color="primary"> Button Default </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button color="primary">'}</span>
                        </code>
                    </pre>

                    <Button color="secondary"> Button Secondary </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button color="secondary">'}</span>
                        </code>
                    </pre>
                </div>

                <h2>Outline</h2>
                <p>Utilise les $theme-colors</p>
                {/* outline */}
                <div>

                    <Button outline="primary"> Button Outline Primary </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button outline="primary">'}</span>
                        </code>
                    </pre>

                    <Button color="pink" outline="blue3"> Button Color Secondary Outline Primary </Button>
                    <pre tabindex="0" className="chroma">
                        <code className="language-html" data-lang="html">
                            <span>{'<Button color="pink" outline="blue3">'}</span>
                        </code>
                    </pre>
                </div>

                <h2>Autres</h2>

                <h3>Classes</h3>

                {/* classes */}
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{"<Button classes='whatever-className-you-want-to-add-to-this-button'>"}</span>
                    </code>
                </pre>

                <h3>href</h3>

                {/* href */}
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{"<Button href='/designSystem'>"}</span>
                    </code>
                </pre>

            </div>

            {/* ArrowButton */}
            <div>
                <h1>ArrowButton</h1>
                <h2>Default</h2>
                <ArrowButton> </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{"<ArrowButton>"}</span>
                    </code>
                </pre>

                <h2> Size </h2>

                <ArrowButton size="large"> Large </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{"<ArrowButton size='large'>"}</span>
                    </code>
                </pre>

                <h2> Color </h2>

                <ArrowButton color="success"> Success </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton color="success">'}</span>
                    </code>
                </pre>

                <h2> Outline </h2>
                <ArrowButton outline="blue3"> Success </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton outline="blue3">'}</span>
                    </code>
                </pre>

                <ArrowButton color="white" outline="success"> Success </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton color="white" outline="success">'}</span>
                    </code>
                </pre>

                <h2> Direction </h2>

                <ArrowButton direction="up"> </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton direction="up">'}</span>
                    </code>
                </pre>

                <ArrowButton direction="down"> </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton direction="down">'}</span>
                    </code>
                </pre>

                <ArrowButton direction="left">  </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton direction="left">'}</span>
                    </code>
                </pre>

                <ArrowButton direction="right"> </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton direction="right">'}</span>
                    </code>
                </pre>

                <h2>Autres</h2>
                <h3> Openned </h3>
                <p>Fait pointer la flèche dans la direction opposée. Applique, s'il-y a lieu, la classe Openned à l'élément. </p>
                <ArrowButton openned> </ArrowButton>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton openned>'}</span>
                    </code>
                </pre>

                <h3> Classes </h3>
                <pre tabindex="0" className="chroma">
                    <code className="language-html" data-lang="html">
                        <span>{'<ArrowButton classes="classes-supplementaire-custom1 deuxieme-classe">'}</span>
                    </code>
                </pre>

            </div>

            {/* Grid System */}
            <div>
                <h1>Grid system</h1>
                <div className="container">
                    <div className="row ">
                        <div className="col-12 bg-primary">
                            Col-12
                        </div>
                    </div>

                    <div className="row g-5">
                        <div className="col-12 bg-primary">
                            Col-12 g-5
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 bg-blue2">
                            Col-6
                        </div>
                        <div className="col-6 bg-blue3">
                            Col-6
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4 p-5 bg-blue3">
                            Col-4 p-5
                        </div>
                        <div className="col-4 p-5 bg-primary">
                            Col-4 p-5
                        </div>
                        <div className="col-4 p-5 bg-blue2">
                            Col-4 p-5
                        </div>

                    </div>
                </div>
            </div>

            {/* Padding and Margin */}
            <div>
                <h1>Padding and Margin</h1>
                <p>
                    <a href="https://getbootstrap.com/docs/5.2/layout/utilities/#margin-and-padding">https://getbootstrap.com/docs/5.2/layout/utilities/#margin-and-padding</a>
                </p>

            </div>


        </>

    );

}

export default DesignSystem

// classList.push(props.classes);
// classList.push(props.openned ? `${styles.openned}` : '');




