import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentTasks: [],
		completeTasks: [],
	},
	mutations: {
		currentTasks (state, tasks) {
			tasks.sort((a, b) => {
				if (a.important === b.important) {
					return 0
				}
				return a.important > b.important ? 1 : -1
			})
			localStorage.currentTasks = JSON.stringify(tasks)
			state.currentTasks = tasks
		},
		completeTasks (state, tasks) {
			tasks.sort((a, b) => {
				if (a.important === b.important) {
					return 0
				}
				return a.important > b.important ? 1 : -1
			})
			localStorage.completeTasks = JSON.stringify(tasks)
			state.completeTasks = tasks
		}
	},
	actions: {
		taskInit ({commit}) {
			if (localStorage.currentTasks) {
				const tasks = JSON.parse(localStorage.currentTasks)
				commit('currentTasks', tasks)
			}

			if (localStorage.completeTasks) {
				const tasks = JSON.parse(localStorage.completeTasks)
				commit('completeTasks', tasks)
			}
		},
		setCurrentTasks ({commit, getters}, task) {
			const tasks = getters.currentTasks
			for (let index in tasks) {
				if (task.id === tasks[index].id) {
					if (task.isEdit) {
						delete task.isEdit
						tasks[index] = task
						commit('currentTasks', tasks)
					}
					return
				}
			}
			delete task.isEdit
			tasks.push(task)
			commit('currentTasks', tasks)
		},
		setCompleteTasks ({commit, getters}, task) {
			const tasks = getters.completeTasks
			for (let index in tasks) {
				if (task.id === tasks[index].id) {
					if (task.isEdit) {
						delete task.isEdit
						tasks[index] = task
						commit('completeTasks', tasks)
					}
					return
				}
			}
			delete task.isEdit
			tasks.push(task)
			commit('completeTasks', tasks)
		},
		removeCurrentTasks({commit, getters}, id) {
			const tasks = getters.currentTasks
			commit('currentTasks', tasks.filter(task => task.id !== id))
		},
		removeCompleteTasks({commit, getters}, id) {
			const tasks = getters.completeTasks
			commit('completeTasks', tasks.filter(task => task.id !== id))
		}
	},
	getters: {
		currentTasks: s => s.currentTasks,
		completeTasks: s => s.completeTasks
	}
})
