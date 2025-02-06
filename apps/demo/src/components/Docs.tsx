import { TbReload } from "react-icons/tb";
import tailwindIntellisenseImage from "../assets/media/Intellisense.png";
import { useState } from "react";

export const Docs = ({
	isExiting,
}: {
	isExiting: boolean;
}) => {
	const [animatedKey, setAnimatedKey] = useState(0);
	return (
		<section className="h-full m-6 prose lg:prose-lg prose-pre:py-3 prose-pre:rounded-xl dark:prose-invert max-w-2xl! prose-img:rounded-xl">
			<article
				style={{
					animationFillMode: "both",
				}}
				className={`${!isExiting ? "animate-blur" : "animate-slide-out-left"}`}
			>
				<h2>Easy collection of animations for your next project.</h2>
				<strong>Thoughtfully designed for modern Tailwind CSS</strong>
				<hr />
				<p>
					The library exports a set of <code>plane css animations</code> ready
					to be used, the new version (4) of Tailwind CSS provides the power of
					the custom theme and css variables to customize the animations.
				</p>
				<h2>Installation</h2>
				<pre>
					<code className="language-bash">npm install @polgubau/animated</code>
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
					animations will still work but you will need to provide the classes
				</blockquote>

				<h4>Usage</h4>
				<p>Really, that's it! Now you can use all animations in your files</p>
				<ul>
					<li className="grid gap-2 items-center grid-cols-[1fr_auto] w-full">
						<pre className="m-0!">
							<code>{`<div className="animate-blur">Hello there!</div>`}</code>
						</pre>
						<button
							type="button"
							onClick={() => setAnimatedKey(animatedKey + 1)}
							className=" relative grid place-items-center ring rounded-xl h-full px-4 cursor-pointer"
						>
							<div className="absolute -top-2 -right-2 bg-gray-300 dark:bg-gray-800 p-1 rounded-full">
								<TbReload size={16} />
							</div>
							<span className="animate-blur" key={animatedKey}>
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
							className=" relative grid place-items-center ring rounded-xl h-full px-4 cursor-pointer"
						>
							<div className="absolute -top-2 -right-2 bg-gray-300 dark:bg-gray-800 p-1 rounded-full">
								<TbReload size={16} />
							</div>
							<span className="animate-fade-in-rotate" key={animatedKey}>
								Hello there!
							</span>
						</button>
					</li>
					<li className="grid gap-2 items-center grid-cols-[1fr_auto] w-full">
						<pre className="m-0!">
							<code>{`<div className="animate-pump">Hello there!</div>`}</code>
						</pre>
						<div className=" relative grid place-items-center ring rounded-xl h-full px-4 cursor-pointer">
							<span className="animate-pump">Hello there!</span>
						</div>
					</li>
				</ul>
				<hr />

				<h3>Customize your animations</h3>
				<p>
					Using normal CSS variables you can also change default values of the
					animations
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
					Now all slide animations will slide 40px instead of the default 20px
					:)
				</small>

				<h3>How can I know the available animations?</h3>
				<p>
					You can just type <code>animate-</code> and you will see all available
					animations:
				</p>
				<div className="relative">
					<figure>
						<div className="p-0 m-0 h-[290px] bg-grey-300 dark:bg-gray-800 rounded-xl overflow-hidden relative z-10">
							<img
								src={tailwindIntellisenseImage}
								className="h-[290px] mt-0!"
								alt="Tailwind intellisense highlighting the available animations"
							/>
						</div>
						<figcaption>
							This will work automatically if you have your tailwind extension
							installed
						</figcaption>
					</figure>
					<img
						src={tailwindIntellisenseImage}
						className="h-[290px] scale-y-115 scale-x-105 not-prose absolute top-0 opacity-30 blur-lg"
						alt="Tailwind intellisense highlighting the available animations"
					/>
				</div>
				<h4>But I want to access them dynamically</h4>
				<p>The library exports an array of all animations in json format in:</p>
				<pre>
					<code>
						{`import animations from "@polgubau/animated/summary";
/* [
  "animate-blur",
  "animate-blur-flash",
  "animate-blur-pulse",
	... /*`}
					</code>
				</pre>
				<p>
					And you can use it as you wish, TIP: this can be useful for creating a
					UI component dynamically animated with a prop
				</p>

				<h2>I'm not using Tailwind</h2>
				<p>
					<strong>@polgubau/animated</strong> is totally compatible with any CSS
					framework or vanilla CSS, just import the library in your main css
					file:
				</p>
				<pre>
					<code>{`/* index.tsx */
import "@polgubau/animated";`}</code>
				</pre>
				<p>
					You have now access to all keyframe animations, keep in mind then that
					you'll need to create the classes in your way
				</p>
				<pre>
					<code>
						{`.fade-in {
  animation: 3s infinite alternate slide-in-top;
}
`}
					</code>
				</pre>
				<hr />
				<h2>Explore the animations</h2>
				<p>
					Now that you know how to use the library, you can explore the
					animations, use the sidebar to navigate through the different
					categories :)
				</p>
			</article>
			<div className="h-[33vh]" />
		</section>
	);
};
