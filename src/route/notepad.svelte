<script lang="ts">
	import NoteComponent from '~/component/note.svelte';
	import type { Note } from '~/type/note';
	import { onMount } from 'svelte';
	import { loadNotes, postNote } from '~/model/note';
	import Input from '~/component/input.svelte';

	let notes = [] as Note[];
	let current = {
		id: '',
		message: '',
	} as Note;

	const removeNote = function (id: string) {
		notes = notes.filter((v: Note) => {
			return v.id !== id;
		});
	};

	const clear = function () {
		current = { id: '', message: '' };
	};

	const onEnter = (e: KeyboardEvent): void => {
		if (e.key !== 'Enter') {
			return;
		}
		createNote();
	};

	const createNote = (): void => {
		postNote(current)
			.then(() => {
				clear();
				loadNotes().then((data) => {
					notes = data;
				});
			})
			.catch(() => {});
	};

	onMount(() => {
		loadNotes().then((data) => {
			if (data) {
				notes = data;
			}
		});
	});
</script>

<section id="note-section" class="section">
	<div class="container">
		<div class="box">
			<div class="field">
				<label for="note-add" class="label">To Do</label>
				<div class="control">
					<Input
						type="text"
						placeholder="What would you like to do?"
						name="note-add"
						keypress={onEnter}
						bind:value={current.message}
						autofocus
					/>
				</div>
			</div>
			<nav class="level is-mobile">
				<div class="level-left">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a title="Add note" class="level-item" on:click|preventDefault={createNote}>
						<span class="icon is-small has-text-success">
							<i class="far fa-plus-square" data-cy="add-note-link" />
						</span>
					</a>
				</div>
			</nav>
		</div>
		<div>
			<ul id="listTodo">
				{#each notes as note}
					<NoteComponent id={note.id} message={note.message} {removeNote} />
				{/each}
			</ul>
		</div>
	</div>
</section>
