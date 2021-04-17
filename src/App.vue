<template>
	<div id="app">
		<div class="container">
			<div class="row">
				<div class="col-md-4 col-lg-3">
					<add-task class="mb-4"/>
					<change-task v-if="isEdit" :id="editId" :type="editType" @closeEditForm="closeEditForm"/>
				</div>
				<div class="col-md-8 col-lg-9">
					<ul class="nav nav-tabs">
						<li class="nav-item">
							<button
								class="nav-link"
								:class="{active: currentTab === 'current'}"
								@click="currentTab = 'current'"
							>Текущие задачи</button>
						</li>
						<li class="nav-item">
							<button
								class="nav-link"
								:class="{active: currentTab === 'completed'}"
								@click="currentTab = 'completed'"
							>Выполненые задания</button>
						</li>
					</ul>
					<keep-alive>
						<component :is="currentTabComponent" />
					</keep-alive>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
import AddTask from './components/AddTask'
import ChangeTask from './components/ChangeTask'
import CurrentTasks from './components/CurrentTasks'
import CompletedTasks from './components/CompletedTasks'

export default {
	name: 'App',
	data () {
		return {
			currentTab: 'current',
			isEdit: false,
			editId: null,
			editType: null
		}
	},
	computed: {
		currentTabComponent () {
			return `${this.currentTab.toLowerCase()}-tasks`
		}
	},
	components: {
		AddTask,
		ChangeTask,
		CurrentTasks,
		CompletedTasks
	},
	methods: {
		editTask (data) {
			this.isEdit = true
			this.editId = data.id
			this.editType = data.type
		},
		closeEditForm () {
			this.isEdit = false
			this.editId = null
			this.editType = null
		}
	},
	beforeCreate () {
		this.$store.dispatch('taskInit')
	},
	mounted () {
		this.$on('editTask', this.editTask)
	}
}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		color: #2c3e50;
		margin-top: 20px;
	}
</style>
