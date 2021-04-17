<template>
	<form class="task-form" :name="`${type}-task`" @submit.prevent="setTask">
		<div class="form-group">
			<input class="form-control" type="text" name="name-task" v-model="name" placeholder="Название" />
		</div>
		<div class="form-group">
			<textarea class="form-control" v-model="disc" placeholder="Описание"></textarea>
		</div>
		<div class="form-check green">
			<input class="form-check-input" type="radio" name="importance" :id="`importance1-${type}`" value="2" v-model="status">
			<label class="form-check-label" :for="`importance1-${type}`">Не важно</label>
		</div>
		<div class="form-check yellow">
			<input class="form-check-input" type="radio" name="importance" :id="`importance2-${type}`" value="1" v-model="status">
			<label class="form-check-label" :for="`importance2-${type}`">Срочно</label>
		</div>
		<div class="form-check red">
			<input class="form-check-input" type="radio" name="importance" :id="`importance3-${type}`" value="0" v-model="status">
			<label class="form-check-label" :for="`importance3-${type}`">Оч. срочно</label>
		</div>
		<div class="form-group mt-2">
			<button type="submit" class="btn btn-outline-dark">{{btnName}}</button>
		</div>
	</form>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			required: true
		},
		btnName: {
			type: String,
			required: true
		},
		item: {
			type: Object,
			required: true
		},
		setType: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			id: Number((new Date).getTime()),
			name: null,
			disc: null,
			status: 2
		}
	},
	methods: {
		setTask () {
			if (!this.name) {
				alert('Поле название не может быть пустым')
				return
			}
			const task = {
				id: Number(this.id),
				name: this.name,
				disc: this.disc,
				important: Number(this.status),
				isEdit: this.type === 'edit' ? true : false
			}

			if (this.type === 'edit') {
				this.$emit('closeEditForm')
			}
			this.$store.dispatch(`set${this.capitalizeFirstLetter(this.setType)}Tasks`, task)
			this.id = Number((new Date).getTime())
			this.name = null
			this.disc = null
			this.status = 2
		},
		capitalizeFirstLetter (string) {
			string = string.toLowerCase()
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
	},
	watch: {
		item (val) {
			this.id = val.id
			this.name = val.name
			this.disc = val.disc
			this.status = val.important
		}
	}
}
</script>

<style>
	.task-form .form-check {
		border-radius: 6px;
		margin-bottom: 2px;
	}
	.task-form .btn,
	.task-form .form-check label {
		width: 100%;
	}
	.task-form .form-check.green {
		background-color: rgba(0, 255, 13, 0.5);
	}
	.task-form .form-check.yellow {
		background-color: rgba(184, 171, 0, 0.5);
	}
	.task-form .form-check.red {
		background-color: rgba(255, 0, 0, 0.5);
	}
</style>