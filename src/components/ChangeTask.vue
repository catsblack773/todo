<template>
	<div class="change-task">
		<h6 class="change-task-title">
			<span>Изменение задачи</span>
			<svg @click="closeEditForm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
		</h6>
		<form-task type="edit" btn-name="Изменить задачу" :set-type="type" :item="item" @closeEditForm="closeEditForm" />
	</div>
</template>

<script>
import FormTask from './FormTask'

export default {
	props: {
		id: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			item: {}
		}
	},
	components: {
		FormTask
	},
	methods: {
		reload () {
			const items = this.$store.getters[`${this.type.toLowerCase()}Tasks`]
			const item = items.filter(task => task.id === this.id)
			if (item[0]) {
				this.item = item[0]
			} else {
				this.closeEditForm()
			}
		},
		closeEditForm () {
			this.$emit('closeEditForm')
		}
	},
	mounted () {
		this.reload()
	},
	watch: {
		id () {
			this.reload()
		},
		type () {
			this.reload()
		}
	}
}
</script>

<style>
	.change-task {
		padding: 15px;
		border: 1px solid #444;
	}
	.change-task-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.change-task-title svg {
		width: 15px;
		height: 15px;
		cursor: pointer;
	}
</style>