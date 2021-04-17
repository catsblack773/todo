<template>
	<div class="add-task">
		<h6>Добавить задачу</h6>
		<form-task type="add" btn-name="Добавить задачу" set-type="current" :item="item"/>
	</div>
</template>

<script>
import FormTask from './FormTask'

export default {
	data () {
		return {
			item: {}
		}
	},
	components: {
		FormTask
	}
}
</script>

<style>
	.add-task {
		padding: 15px;
		border: 1px solid #444;
	}
</style>