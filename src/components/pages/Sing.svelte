<script lang="ts">
  import { onMount } from "svelte"
  import { clsx } from "clsx"
  import GithubIcon from "virtual:icons/uil/github"

  let hasUserScrolled = false
  let coverElement: HTMLElement
  let coverHasEnteredViewport = false
  $: shouldAnimateCover = hasUserScrolled && coverHasEnteredViewport

  $: console.log({
    shouldAnimateCover,
    hasUserScrolled,
    coverHasEnteredViewport,
  })

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
        alt="Sing Logo"
        src="https://github.com/Visual-Dawg/sing/raw/master/buildResources/icon.png"
        class=" max-w-full"
      />
    </div>

    <h1 class="_gradient-heading mb-3 mt-6 pb-3 text-8xl font-bold">Sing</h1>

    <div
      class="group mb-12 flex flex-col gap-1 text-xl font-bold text-zinc-400 transition-colors hover:underline"
    >
      <a
        class="flex items-center gap-4 "
        href="https://github.com/Visual-Dawg/sing"
        target="_blank"
        rel="noreferrer noopener"
      >
        <h2 class="text-shadow  ">Simple elegant music library</h2>

        <GithubIcon class="group-hover:text-white" />
      </a>
    </div>
  </div>
</div>

<!-- Cover -->
<div
  class={clsx(
    "_cover-wrapper   h-[637px] w-[900px] px-0 transition-all duration-[1575ms]"
  )}
  bind:this={coverElement}
>
  <img
    alt="Sing screenshot"
    class={clsx(
      "_cover  h-full w-full object-contain shadow-2xl",
      shouldAnimateCover && "_cover-visible "
    )}
    src="sing-screen.jpg"
  />
  <div
    class={clsx(
      "_cover _mask h-full w-full",
      shouldAnimateCover && "_cover-visible "
    )}
  />
</div>

<!-- Content-->
<div class="text-shadow _prose mx-8 max-w-prose text-base">
  <h3>Background</h3>
  <p>
    I found that existing music library applications were lacking in aesthetics
    and functionality. Determined to create a superior option, I embarked on a
    challenging but rewarding year-long project. Despite encountering unexpected
    obstacles along the way, I was able to develop a functional solution that
    meets my own needs. Moving forward, I am eager to continue enhancing the app
    with additional features and to refine its existing components for an even
    more seamless experience.
  </p>

  <h3>Techstack</h3>
  <div class="my-8 flex flex-wrap justify-center gap-8">
    <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer"
      ><img
        class="h-20 w-20 transition-transform hover:scale-105"
        src="svelte-icon.svg"
        alt="Svelte logo"
      /></a
    >
    <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"
      ><img
        class="h-20 w-20 transition-transform hover:scale-105"
        src="tailwindcss-icon.svg"
        alt="TailwindCSS logo"
      /></a
    >
    <a
      href="https://www.typescriptlang.org/"
      target="_blank"
      rel="noopener noreferrer"
      ><img
        alt="Typescript logo"
        class="h-20 w-20 transition-transform hover:scale-105"
        src="typescript-icon.svg"
      /></a
    >
    <a href="https://prisma.io/" target="_blank" rel="noopener noreferrer">
      <img
        alt="Prisma logo"
        class="h-20 w-20 rounded-lg bg-zinc-200 p-2 transition-transform hover:scale-105"
        src="prisma.svg"
      />
    </a>
    <a
      href="https://www.electronjs.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt="Electron logo"
        class="h-20 w-20 rounded-lg bg-zinc-800 p-2 transition-transform hover:scale-105"
        src="electron.svg"
      />
    </a>
  </div>
  <p>
    To develop my music library application, I used Svelte, TypeScript,
    TailwindCSS, Electron, and Prisma with SQLite. These tools allowed me to
    (relatively) easily and practically create the app.
  </p>

  <h3>Design</h3>
  <p>
    The app is designed for individuals who want to build and maintain their
    personal music libraries. Recognizing the effort and care that goes into
    this, the app aims to provide a rewarding experience by putting the focus on
    the music and presenting it in a visually stunning manner. <br />To achieve
    this aesthetic, the interface is kept simple and minimalistic, with many
    elements utilizing translucency to further highlight album artwork.
  </p>

  <!-- svelte-ignore a11y-media-has-caption -->
  <video autoplay muted loop src="sing ui atomic video.mp4" />
  <p class="subtext">Atomic design in action</p>

  <img
    src="atomic design.png"
    alt="The UI library displaying the use of atomic design"
  />
  <p class="subtext ">UI library</p>
  <p />
</div>

<style lang="postcss">
  ._prose {
    & p {
      @apply mt-1 text-zinc-400;
    }
    & h3 {
      @apply mt-16 mb-4 text-center text-3xl font-bold;
    }

    & *::selection {
      text-shadow: none;
    }

    > .subtext {
      font-size: 12px;
      font-weight: medium;
      color: theme(colors.zinc[400]);
      text-align: center;
    }

    & > img,
    & > video {
      min-width: none;
      margin-left: 0px;
      margin-top: 2rem;
      @apply rounded-2xl shadow-md;

      @media screen(md) {
        min-width: 130%;
        margin-left: -15%;
      }
    }
  }

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
      theme(colors.orange[900]/1) 0%,
      theme(colors.zinc[900]) 100%
    );
    opacity: 0.95;
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
      theme(colors.orange[500]) 60%,
      theme(colors.zinc[900]) 100%
    );
    background-clip: text;
    color: transparent;

    &::selection {
      color: theme(colors.white);
    }
  }
</style>
