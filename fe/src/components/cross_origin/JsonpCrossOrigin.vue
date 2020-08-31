<template>
	<div class="diy-jsonp-form">
		<a-page-header title="通过jsonp的方式进行跨域" />
		<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-item label="随便写点什么吧">
				<a-input v-model:value="form.anything" />
			</a-form-item>
			<a-form-item label="jsonp实现方式">
				<a-radio-group v-model:value="form.jsonpType">
					<a-radio value="native">原生jsonp</a-radio>
					<a-radio value="jquery">jquery jsonp</a-radio>
					<a-radio value="empty">无跨域</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">提交</a-button>
			</a-form-item>
		</a-form>
		<a-page-header v-if="returnMsg !== ''" title="返回信息" />
		<p v-if="returnMsg !== ''">{{returnMsg}}</p>
	</div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
	name: "JsonpCrossOrigin",
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			form: {
				anything: "",
				jsonpType: "",
			},
			returnMsg: "",
		};
	},
	methods: {
		onSubmit() {
			this[this.form.jsonpType]();
		},
		native() {
			let script = document.createElement("script"),
				jsonpCallbackName = "jsonpCallback",
				context = this;

			script.type = "text/javascript";
			script.src = `http://localhost:3000/api/testGet?anything=${this.form.anything}&callback=${jsonpCallbackName}`; // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
			document.head.appendChild(script);

			window[jsonpCallbackName] = function (res) {
				document.head.removeChild(script);
				delete window[jsonpCallbackName];
				context.returnMsg = res;
			};
		},
		jquery() {
			let jsonpCallbackName = "jsonpCallback",
				context = this;

			$.ajax({
				url: "http://localhost:3000/api/testGet",
				type: "get",
				dataType: "jsonp",
				jsonpCallback: jsonpCallbackName,
				data: {
					anything: this.form.anything,
				},
			});

			window[jsonpCallbackName] = function (res) {
				delete window[jsonpCallbackName];
				context.returnMsg = res;
			};
		},
		empty() {
			axios
				.request({
					url: "http://localhost:3000/api/testGet",
					data: {
						anything: this.anything,
					},
					method: "get",
				})
				.then((res) => {
					this.returnMsg = res;
				})
				.catch((error) => {
					this.returnMsg = error;
				});
		},
	},
};
</script>

<style scoped>
.diy-jsonp-form {
	width: 900px;
}
</style>
