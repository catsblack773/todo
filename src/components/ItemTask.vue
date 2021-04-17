<template>
	<div class="item-task-wrapp" :class="colors[item.important]">
		<div class="row">
			<div class="col-md-11">
				<h6 class="item-task-title">
					<input :id="`item-task-${item.id}`" type="checkbox" @click="changeStatusTask" />
					<label :for="`item-task-${item.id}`">{{item.name}}</label>
				</h6>
				<p>{{item.disc}}</p>
			</div>
			<div class="col-md-1 action-wrapp">
				<svg @click="editTask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
				<svg @click="removeTask" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	data () {
		return {
			colors: ['red', 'yellow', 'green']
		}
	},
	methods: {
		changeStatusTask () {
			this.$store.dispatch(`remove${this.capitalizeFirstLetter(this.type)}Tasks`, this.item.id)
			this.$store.dispatch(`set${this.capitalizeFirstLetter(this.type === 'current' ? 'complete' : 'current')}Tasks`, this.item)
		},
		removeTask () {
			this.$store.dispatch(`remove${this.capitalizeFirstLetter(this.type)}Tasks`, this.item.id)
		},
		editTask () {
			this.$emit('editTask', this.item.id)
		},
		capitalizeFirstLetter (string) {
			string = string.toLowerCase()
			return string.charAt(0).toUpperCase() + string.slice(1)
		}
	}
}
</script>

<style>
	.item-task-wrapp {
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #ccc;
		border-bottom-width: 0;
	}
	.item-task-wrapp:last-child {
		margin-bottom: 0;
		border-bottom-width: 1px;
	}
	.item-task-wrapp.red {
		background: rgba(255, 0, 0, .5);
	}
	.item-task-wrapp.yellow {
		background: rgba(184, 171, 0, 0.5);
	}
	.item-task-wrapp.green {
		background: rgba(0, 255, 13, 0.5);
	}
	.item-task-title input {
		display: inline-block;
		margin-right: 5px;
	}
	.item-task-title label,
	.item-task-title input  {
		cursor: pointer;
	}
	.action-wrapp {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	.action-wrapp svg {
		width: 20px;
		height: 20px;
		margin-bottom: 10px;
		cursor: pointer;
	}
	.action-wrapp svg:last-child {
		margin-bottom: 0;
	}
	.action-wrapp svg:hover {
		color: #677;
	}
</style>