<script>
	export let title = '';
	export let description = '';
</script>

<div>
	<section class="section">
		<div class="container">
			<h1 class="title">{title}</h1>
			<h2 class="subtitle">{description}</h2>
			<slot />
		</div>
	</section>
</div>
