<template>
    <div class="completed-tasks">
        <h4>Выполненые задачи</h4>
		<template v-if="items.length">
			<item-task
				v-for="item in items"
				:key="item.id"
				:item="item"
				type="complete"
				@editTask="editTask"
			/>
		</template>
		<h6 v-else>У Вас нет выполненых задач</h6>
    </div>
</template>

<script>
import ItemTask from './ItemTask'

export default {
    computed: {
		items () {
			return this.$store.getters.tasks ? this.$store.getters.tasks.filter(task => task.type === 'complete') : []
		}
	},
	components: {
		ItemTask
	},
	methods: {
		editTask (id) {
			this.$parent.$emit('editTask', {
				type: 'complete',
				id
			})
		}
	}
}
</script>

<style>
	.completed-tasks {
		padding: 1rem;
		border: 1px solid #dee2e6;
		border-top: 0
	}
</style>