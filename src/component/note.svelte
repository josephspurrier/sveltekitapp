<script lang="ts">
	import { deleteNote, updateNote } from '~/model/note';
	import { debounce } from '~/lib/debounce';

	export let id = '';
	export let message = '';
	export let removeNote: (e: string) => void;
	let saving = '';
</script>

<li style="margin-top: 12px;">
	<div class="box">
		<div class="content">
			<div class="editable">
				<input
					{id}
					type="text"
					class="input individual-note"
					bind:value={message}
					on:keyup={() => {
						debounce(
							id,
							() => {
								saving = 'Saved';
								updateNote(id, message);
								setTimeout(() => {
									saving = '';
								}, 1000);
							},
							1000,
						);
					}}
				/>
			</div>
		</div>
		<nav class="level is-mobile">
			<div class="level-left">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a
					title="Delete note"
					class="level-item"
					on:click={() => {
						deleteNote(id, removeNote);
					}}
				>
					<span class="icon is-small has-text-danger">
						<i class="fas fa-trash" data-cy="delete-note-link" />
					</span>
				</a>
			</div>
			<div class="level-right" style="min-height: 1.2rem;">
				<span class="is-size-7 has-text-grey">{saving}</span>
			</div>
		</nav>
	</div>
</li>
