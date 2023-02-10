<script lang="ts">
  import clsx from "clsx"

  export let name: string
  export let id: string | undefined = undefined
  export let value: string | undefined = undefined
  export let placeholder: string | undefined = undefined
  export let maxWidth = "100%"
  export let hasLabel = true
</script>

<label class="pointer flex flex-col gap-2 rounded-none text-lg">
  <span class={clsx(!hasLabel && "hidden")}>{name}</span>

  <input
    type="text"
    {name}
    {id}
    {placeholder}
    bind:value
    class="
      _shadow h-10 rounded-sm border-2 border-solid border-stone-400
      bg-amber-50 px-2 text-base shadow shadow-amber-500/25
      transition-shadow placeholder:text-stone-400 focus:border-black focus:outline-none
      "
    style={`max-width: ${maxWidth}`}
  />
</label>

<style lang="postcss">
  ._shadow {
    &:focus {
      box-shadow: 4px 4px 0px theme(colors.amber.500 / 10%);
    }
  }
</style>
