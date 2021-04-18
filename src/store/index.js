import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentTasks: [],
		completeTasks: [],
		tasks: []
	},
	mutations: {
		setTasks (state, tasks) {
			tasks.sort((a, b) => {
				if (a.important === b.important) {
					return 0
				}
				return a.important > b.important ? 1 : -1
			})
			localStorage.tasks = JSON.stringify(tasks)
			state.tasks = tasks
		}
	},
	actions: {
		taskInit ({commit}) {
			if (localStorage.tasks) {
				const tasks = JSON.parse(localStorage.tasks)
				commit('setTasks', tasks)
			}
		},
		setTask ({commit, getters}, task) {
			const tasks = getters.tasks
			for (let index in tasks) {
				if (task.id === tasks[index].id) {
					if (task.isEdit) {
						delete task.isEdit
						tasks[index] = task
						commit('setTasks', tasks)
					}
					return
				}
			}
			delete task.isEdit
			tasks.push(task)
			commit('setTasks', tasks)
		},
		removeTask({commit, getters}, id) {
			const tasks = getters.tasks
			commit('setTasks', tasks.filter(task => task.id !== id))
		}
	},
	getters: {
		tasks: s => s.tasks
	}
})
