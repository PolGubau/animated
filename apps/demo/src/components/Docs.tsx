import { TbReload } from "react-icons/tb";
import tailwindIntellisenseImage from "../assets/media/Intellisense.png";
import { useState } from "react";

export const Docs = ({ isExiting }: { isExiting: boolean }) => {
	const [animatedKey, setAnimatedKey] = useState(0);

	return (
		<section className="h-full m-6 prose lg:prose-lg prose-pre:py-3 prose-pre:rounded-xl dark:prose-invert max-w-2xl! prose-img:rounded-xl">
			<article
				style={{ animationFillMode: "both" }}
				className={`${!isExiting ? "animate-blur" : "animate-slide-out-left"}`}
			>
				<h2>Easy Animations for Your Next Project 🚀</h2>
				<strong>Thoughtfully designed for modern Tailwind CSS ✨</strong>
				<hr />
				<p>
					This library exports a set of <code>pure CSS animations</code> ready
					to use. The new version (v4) of Tailwind CSS leverages the power of
					custom themes and CSS variables to customize the animations to your
					liking.
				</p>

				<h2>Installation 🔧</h2>
				<pre>
					<code className="language-bash">npm install @polgubau/animated</code>
				</pre>
				<small>
					You can use yarn if you prefer; the library is available on npm as
					well.
				</small>

				<h2>I'm Using Tailwind 🎨</h2>
				<p>Simply import the library in your main CSS file:</p>
				<pre>
					<code className="language-bash">
						{`/* index.css */
@import "tailwindcss";
@import "@polgubau/animated";
`}
					</code>
				</pre>
				<blockquote>
					This library uses Tailwind v4. If you're using older versions, the
					animations will still work, but you'll need to provide the classes
					manually.
				</blockquote>

				<h4>Usage ⚡️</h4>
				<p>That's it! Now you can use all the animations in your files.</p>
				<ul>
					<li className="grid gap-2 items-center grid-cols-[1fr_auto] w-full">
						<pre className="m-0!">
							<code>{`<div className="animate-blur">Hello there!</div>`}</code>
						</pre>
						<button
							type="button"
							onClick={() => setAnimatedKey(animatedKey + 1)}
							className="relative grid place-items-center ring rounded-xl h-full px-4 cursor-pointer"
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
							<code>{`<div className="animate-fade-in-rotate">Hello there!</div>`}</code>
						</pre>
						<button
							type="button"
							onClick={() => setAnimatedKey(animatedKey + 1)}
							className="relative grid place-items-center ring rounded-xl h-full px-4 cursor-pointer"
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
						<div className="relative grid place-items-center ring rounded-xl h-full px-4 cursor-pointer">
							<span className="animate-pump">Hello there!</span>
						</div>
					</li>
				</ul>
				<hr />

				<h3>Customize Your Animations 🎨</h3>
				<p>
					Using regular CSS variables, you can change the default values of the
					animations to fit your design.
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
--rolled-degree: 360deg;
--rolled-degree-negative: calc(-1 * var(--rolled-degree));
--rolled-distance: 100%;
--rolled-distance-negative: calc(-1 * var(--rolled-distance));
`}
					</code>
				</pre>
				<p>
					Simply override these values in your main CSS file under the library
					import to personalize your animations.
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
					Now all slide animations will slide 40px instead of the default 20px!
					😎
				</small>

				<h3>How Can I See the Available Animations? 🔍</h3>
				<p>
					You can simply type <code>animate-</code> and you'll see all available
					animations in your editor.
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
							This will work automatically if you have your Tailwind extension
							installed in your IDE.
						</figcaption>
					</figure>
					<img
						src={tailwindIntellisenseImage}
						className="h-[290px] scale-y-115 scale-x-105 not-prose absolute top-0 opacity-30 blur-lg"
						alt="Tailwind intellisense highlighting the available animations"
					/>
				</div>

				<h4>But I Want to Access Them Dynamically 💡</h4>
				<p>The library exports an array of all animations in JSON format:</p>
				<pre>
					<code>
						{`import animations from "@polgubau/animated/summary";
/* [
  "animate-blur",
  "animate-blur-flash",
  "animate-blur-pulse",
	... */
`}
					</code>
				</pre>
				<p>
					You can use this array however you like. TIP: This is useful for
					creating dynamically animated UI components based on props. 🌟
				</p>

				<h2>I'm Not Using Tailwind 🚫</h2>
				<p>
					<strong>@polgubau/animated</strong> is fully compatible with any CSS
					framework or vanilla CSS. Just import the library in your main CSS
					file:
				</p>
				<pre>
					<code>{`/* index.tsx */
import "@polgubau/animated";`}</code>
				</pre>
				<p>
					You'll now have access to all keyframe animations, but remember you'll
					need to create the classes manually.
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

				<h2>Explore the Animations 🌟</h2>
				<p>
					Now that you know how to use the library, dive into the animations!
					Use the sidebar to explore different categories and see them in
					action. Enjoy! 🎉
				</p>
			</article>
			<div className="h-[33vh]" />
		</section>
	);
};
