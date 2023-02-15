<script lang="ts">
  import { onMount } from "svelte"
  import { clsx } from "clsx"
  import GithubIcon from "virtual:icons/uil/github"
  import GlobeIcon from "virtual:icons/uil/globe"
  import Button from "../atoms/Button.svelte"
  import Logo from "../atoms/Logo.svelte"

  let hasUserScrolled = false
  let coverElement: HTMLElement
  let coverHasEnteredViewport = false
  $: shouldAnimateCover = hasUserScrolled && coverHasEnteredViewport

  const coverObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) return

        coverHasEnteredViewport = true
        observer.disconnect()
      }
    },
    { threshold: 0.6 }
  )

  onMount(() => {
    coverObserver.observe(coverElement)
    document.body.addEventListener("scroll", setHasUserScrolled)

    return () => {
      document.body.removeEventListener("scroll", setHasUserScrolled)
      coverObserver.disconnect()
    }
  })
  function setHasUserScrolled() {
    hasUserScrolled = true
    document.body.removeEventListener("scroll", setHasUserScrolled)
  }
</script>

<!-- Hero -->
<div class="z-10 mt-8 flex flex-col text-center">
  <div class="mb-6 flex grow flex-col items-center justify-center">
    <div class="mb-6 h-40 w-40  shadow-xl shadow-zinc-900">
      <img
        alt="Numerology toolbox logo"
        src="numerology-logo.svg"
        class="w-full"
      />
    </div>

    <h1 class="_gradient-heading mb-3 mt-6 pb-3 text-8xl font-bold">
      Numerology Toolbox
    </h1>

    <div
      class="group mb-12 flex flex-col gap-1 text-xl font-bold text-zinc-400"
    >
      <h2 class="text-shadow mb-3">Calculate your numerological numbers</h2>
      <div class="flex justify-center gap-4">
        <a
          class="flex items-center gap-4 "
          href="https://github.com/Visual-Dawg/numerology_tools"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GithubIcon class="hover:text-white" />
        </a>
        <a
          class="flex items-center gap-4 "
          href="numerology-toolbelt.surge.sh"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GlobeIcon class="hover:text-white" />
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Cover -->
<div
  class={clsx(
    "_cover-wrapper h-[637px] w-[900px] px-0 transition-all duration-[1575ms] max-lg:h-[495px] max-lg:w-[700px] max-md:h-[340px] max-md:w-[480px]"
  )}
  bind:this={coverElement}
>
  <img
    src="numerology-screen.png"
    alt="Numerology Toolbelt screenshot"
    class={clsx(
      "_cover  h-full w-full rounded-md",
      shouldAnimateCover && "_cover-visible "
    )}
  />
  <div
    class={clsx(
      "_cover _mask _image_perspective pointer-events-none h-full w-full ",
      shouldAnimateCover && "_cover-visible "
    )}
  />
</div>

<!-- Content-->
<div class="text-shadow prose_ mx-8 mt-16 max-w-prose text-center text-base">
  <div class=" font-medium">
    <p class="mb-8 text-2xl !text-zinc-300">
      Small and simple app to calculate numerological numbers.
    </p>
  </div>

  <h3>Techstack</h3>
  <div class="my-8 flex flex-wrap justify-center gap-8">
    <Logo href="https://svelte.dev/" icon="svelte-icon.svg" name="Svelte" />
    <Logo
      href="https://tailwindcss.com/"
      icon="tailwindcss-icon.svg"
      name="TailwindCSS"
    />
    <Logo
      href="https://www.typescriptlang.org/"
      icon="typescript-icon.svg"
      name="Typescript"
    />
    <Logo href="https://vitest.dev/" icon="vitest.svg" name="Vitest" />
  </div>
  <p>I used Svelte, TypeScript, TailwindCSS and Vitest to build the app.</p>
</div>

<Button
  label="Check it out online"
  href="https://numerology-toolbelt.surge.sh/"
  classes="mt-24 mx-auto"
  isBig
/>

<style lang="postcss">
  ._cover-wrapper {
    perspective: 500px;
  }

  ._cover {
    transform: rotateX(20deg) translateY(-206px);
    transition-property: opacity transform;
    transition-duration: 1400ms;
    transition-timing-function: cubic-bezier(0.85, 0.17, 0.64, 0.98);
    position: relative;
    opacity: 0.5;
    z-index: -210;

    &._cover-visible {
      transform: rotateX(0deg) scale(1) translateY(0px);
      opacity: 1;
    }
  }

  ._mask {
    background: linear-gradient(
      360deg,
      theme(colors.orange[400]/1) 0%,
      theme(colors.zinc[900]) 100%
    );
    opacity: 0.65;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    z-index: 10;

    &._cover-visible {
      opacity: 0;
    }
  }

  ._gradient-heading {
    background: linear-gradient(
      to right bottom,
      theme(colors.orange[300]) 20%,
      theme(colors.red[300]) 60%,
      theme(colors.zinc[900]) 100%
    );
    background-clip: text;
    color: transparent;

    &::selection {
      color: theme(colors.white);
    }
  }
</style>
