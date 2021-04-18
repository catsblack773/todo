<template>
	<div class="current-tasks">
		<h4>Текущие задачи</h4>
		<template v-if="items.length">
			<item-task
				v-for="item in items"
				:key="item.id"
				:item="item"
				type="current"
				@editTask="editTask"
			/>
		</template>
		<h6 v-else>У Вас нет задач для выполнения</h6>
	</div>
</template>

<script>
import ItemTask from './ItemTask'

export default {
	computed: {
		items () {
			return this.$store.getters.currentTasks ?? []
		}
	},
	components: {
		ItemTask
	},
	methods: {
		editTask (id) {
			this.$parent.$emit('editTask', {
				type: 'current',
				id
			})
		}
	}
}
</script>

<style>
	.current-tasks {
		padding: 1rem;
		border: 1px solid #dee2e6;
		border-top: 0
	}
</style>