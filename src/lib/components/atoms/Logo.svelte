<script lang="ts">
  export let href: string
  export let icon: string
  export let name: string
  export let classes: string | undefined = undefined
</script>

<a {href} target="_blank" rel="noopener noreferrer"
  ><img
    class="h-20 w-20 transition-transform hover:scale-105 {classes}"
    src={icon}
    alt="{name} logo"
  /></a
>
