import { useCallback, useEffect, useMemo, useState } from "react";
import { TbArrowLeft, TbArrowRight, TbReload } from "react-icons/tb";
import animations from "./assets/data/animations.json";
import CardList from "./components/CardList";
import { Heading } from "./components/Heading";

type Category = {
	id: number;
	title: string;
	description: string;
	animations: string[];
};

const welcomeCategory: Category = {
	id: 0,
	title: "Animated",
	description: "Easy and modern tailwind v4 animations",
	animations: [],
};

const getCategoryByTitle = (title: Category["title"]): Category => {
	return (
		animations.find((category) => category.title === title) ?? welcomeCategory
	);
};

function App() {
	const [selectedAnimationName, setSelectedAnimationName] = useState<string>(
		() => window.location.pathname.replace("/", "") || "Animated",
	);

	const selectedCategory = useMemo(() => {
		return getCategoryByTitle(selectedAnimationName);
	}, [selectedAnimationName]);

	const [displayedAnimation, setDisplayedAnimation] =
		useState<Category>(selectedCategory);
	const [isExiting, setIsExiting] = useState(false);

	const handleChangeCategory = useCallback((newCategory: Category) => {
		setIsExiting(true);
		window.history.pushState({}, "", newCategory.title);
		setTimeout(() => {
			setDisplayedAnimation(newCategory);
			setSelectedAnimationName(newCategory.title);
			setIsExiting(false);
		}, 600);
	}, []);

	useEffect(() => {
		document.title = `Animated - ${selectedCategory.title} | Pol Gubau`;
	}, [selectedCategory]);

	const currentIdx = useMemo(
		() => animations.findIndex((section) => section.id === selectedCategory.id),
		[selectedCategory.id],
	);
	const nextIndex = (currentIdx + 1) % animations.length;
	const prevIndex = (currentIdx - 1 + animations.length) % animations.length;

	const [animatedKey, setAnimatedKey] = useState(0);
	return (
		<main className="grid md:grid-cols-[380px_1fr] xl:grid-cols-[450px_1fr] 2xl:grid-cols-[500px_1fr] md:h-screen">
			<aside className="md:h-screen w-full flex flex-col p-8 bg-slate-200 ">
				<header>
					<h1 className="flex gap-1 items-center text-lg font-semibold">
						<a
							href="https://www.polgubau.com"
							className="opacity-70 hover:underline"
							target="_blank"
							rel="noreferrer"
						>
							@polgubau/
						</a>
						<button
							type="button"
							onClick={() => handleChangeCategory(welcomeCategory)}
							className="font-bold"
						>
							Animated
						</button>
					</h1>
				</header>

				<section className="flex gap-1 flex-col h-full md:pt-72 ">
					<h1>
						<Heading
							text={displayedAnimation.title ?? "Animated"}
							isExiting={isExiting}
							className="text-6xl xl:text-8xl font-bold"
							enterAnimation="animate-slide-in-top"
							exitAnimation="animate-slide-out-top"
						/>
					</h1>
					<Heading
						text={displayedAnimation.description}
						isExiting={isExiting}
						delay={0.01}
						className="pl-2 text-lg text-gray-700"
						enterAnimation="animate-slide-in-top"
						exitAnimation="animate-slide-out-top"
					/>
					<nav className="flex items-center gap-3 mt-6">
						<button
							aria-label="Previous category"
							title="Previous category"
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-slate-300/5 hover:bg-slate-300/80 transition-all"
							onClick={() => handleChangeCategory(animations[prevIndex])}
							type="button"
						>
							<TbArrowLeft />
						</button>
						<button
							aria-label="Next category"
							title="Next category"
							className="outline focus:outline-4 rounded-full text-4xl p-2 flex items-center justify-center cursor-pointer bg-slate-300/5 hover:bg-slate-300/80 transition-all"
							onClick={() => handleChangeCategory(animations[nextIndex])}
							type="button"
						>
							<TbArrowRight />
						</button>
					</nav>
				</section>

				<section id="category_legend">
					<ul className="mt-6">
						{animations.map((animation) => (
							<li key={animation.id}>
								<button
									type="button"
									onClick={() => handleChangeCategory(animation)}
									className={`text-2xl font-semibold text-slate-900 outline-0 focus-visible:outline-1 rounded-md overflow-hidden relative flex items-start justify-start text-start
                    ${displayedAnimation.id === animation.id ? "underline" : ""}`}
								>
									<div
										className={`absolute inset-0 bg-yellow-400 transition-all left-0 top-0 text-transparent
                      ${displayedAnimation.id === animation.id ? "animate-grow-x-in-left" : "animate-grow-x-out-left"}`}
										style={{ animationFillMode: "both" }}
									>
										{animation.title}
									</div>
									<span className="relative">{animation.title}</span>
								</button>
							</li>
						))}
					</ul>
				</section>
			</aside>

			<section className="p-10 overflow-y-auto">
				{displayedAnimation.animations.length > 0 ? (
					<CardList
						animations={displayedAnimation.animations}
						isExiting={isExiting}
					/>
				) : (
					<section className="h-full grid grid-rows-[1fr_auto] gap-4 m-6 prose lg:prose-lg prose-pre:py-3 prose-pre:rounded-xl">
						<article>
							<h2>Easy collection of animations for your next project.</h2>
							<strong>Thoughtfully designed for modern Tailwind CSS</strong>
							<hr />
							<p>
								The library exports a set of <code>plane css animations</code>{" "}
								ready to be used, the new version (4) of Tailwind CSS provides
								the power of the custom theme and css variables to customize the
								animations.
							</p>
							<h2>Installation</h2>
							<pre>
								<code className="language-bash">
									npm install @polgubau/animated
								</code>
							</pre>
							<small>
								You can use yarn if you prefer, the library is available in npm
							</small>
							{/*  */}
							<h2>I'm using Tailwind</h2>
							<p>Just import the library in your main css file:</p>
							<pre>
								<code className="language-bash">
									{`/* index.css */
@import "tailwindcss";
@import "@polgubau/animated";
`}
								</code>
							</pre>
							<blockquote>
								This library uses Tailwind v4, if you use previous versions the
								animations will still work but you will need to provide the
								classes
							</blockquote>

							<h4>Usage</h4>
							<p>
								Really, that's it! Now you can use all animations in your files
							</p>
							<ul>
								<li className="grid gap-2 items-center grid-cols-[1fr_auto] w-full">
									<pre className="m-0!">
										<code>
											{`<div className="animate-slide-in-top">Hello there!</div>`}
										</code>
									</pre>
									<button
										type="button"
										onClick={() => setAnimatedKey(animatedKey + 1)}
										className=" relative grid place-items-center outline rounded-xl h-full px-4 cursor-pointer"
									>
										<div className="absolute -top-2 -right-2 bg-slate-300 p-1 rounded-full">
											<TbReload size={16} />
										</div>
										<span className="animate-slide-in-top" key={animatedKey}>
											Hello there!
										</span>
									</button>
								</li>
								<li className="grid gap-2 items-center grid-cols-[1fr_auto] w-full">
									<pre className="m-0!">
										<code>
											{`<div className="animate-fade-in-rotate">Hello there!</div>`}
										</code>
									</pre>
									<button
										type="button"
										onClick={() => setAnimatedKey(animatedKey + 1)}
										className=" relative grid place-items-center outline rounded-xl h-full px-4 cursor-pointer"
									>
										<div className="absolute -top-2 -right-2 bg-slate-300 p-1 rounded-full">
											<TbReload size={16} />
										</div>
										<span className="animate-fade-in-rotate" key={animatedKey}>
											Hello there!
										</span>
									</button>
								</li>
								<li className="grid gap-2 items-center grid-cols-[1fr_auto] w-full">
									<pre className="m-0!">
										<code>
											{`<div className="animate-pump">Hello there!</div>`}
										</code>
									</pre>
									<button
										type="button"
										onClick={() => setAnimatedKey(animatedKey + 1)}
										className=" relative grid place-items-center outline rounded-xl h-full px-4 cursor-pointer"
									>
										<div className="absolute -top-2 -right-2 bg-slate-300 p-1 rounded-full">
											<TbReload size={16} />
										</div>
										<span className="animate-pump" key={animatedKey}>
											Hello there!
										</span>
									</button>
								</li>
							</ul>
							<hr />

							<h3>Customize your animations</h3>
							<p>
								Using normal CSS variables you can also change default values of
								the animations
							</p>
							<p>The predefined values are:</p>
							<pre>
								<code>
									{`--smaller-scale: 0.8;
--larger-scale: 1.2;
--pump-amount: 1.1;
--pump-soft-amount: 1.05;
--pump-hard-amount: 1.2;
--pump-x-amount: 1.1;
--pump-y-amount: 1.1;
--pump-bounce-amount: 1.15;
--blur-amount: 8px;
--slide-amount: 20px;
--slide-amount-negative: calc(-1 * var(--slide-amount));
--rotation: 10deg;
--rotation-negative: calc(-1 * var(--rotation));
--small-rotation: calc(0.5 * var(--rotation));
--small-rotation-negative: calc(-1 * var(--small-rotation));
--shake-amount: 5px;
--shake-amount-negative: calc(-1 * var(--shake-amount));
--movement-distance: 10px;
--fade-scale: 0.95;
`}
								</code>
							</pre>
							<p>
								Just override the values in your main css file under the library
								import
							</p>
							<pre>
								<code>
									{`/* index.css */
@import "tailwindcss";
@import "@polgubau/animated";

:root {
	--slide-amount: 40px;
}
`}
								</code>
							</pre>
							<small>
								Now all slide animations will slide 40px instead of the default
								20px
							</small>

							<h3>Usage without Tailwind</h3>
							<pre>
								<code>
									{`import "@polgubau/animated";`}
									{`<div class="animate-slide-in-top">I'm animated!</div>`}
								</code>
							</pre>
						</article>

						<footer className="h-min items-center text-sm text-gray-700">
							Made proudly{" "}
							<a
								href="https://github.com/PolGubau/animated"
								target="_blank"
								rel="noreferrer"
								className="underline"
							>
								Open Source
							</a>{" "}
							and with love by{" "}
							<a
								href="https://www.polgubau.com"
								target="_blank"
								rel="noreferrer"
								className="underline"
							>
								Pol Gubau Amores
							</a>
						</footer>
					</section>
				)}
			</section>
		</main>
	);
}

export default App;
