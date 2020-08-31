<template>
	<div class="diy-form">
		<a-page-header title="跨域资源共享（CORS）" />
		<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-item :label="form.anything.label">
				<a-input v-model:value="form.anything.value" />
			</a-form-item>
			<a-form-item :label="form.isDeliverCookie.label">
				<a-radio-group v-model:value="form.isDeliverCookie.value" :defaultValue="false">
					<a-radio :value="true">Yes</a-radio>
					<a-radio :value="false">No</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item :label="form.httpType.label">
				<a-radio-group v-model:value="form.httpType.value" defaultValue="post">
					<a-radio value="get">get</a-radio>
					<a-radio value="post">post</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item :label="form.contentType.label">
				<a-radio-group
					v-model:value="form.contentType.value"
					defaultValue="application/x-www-form-urlencoded"
				>
					<a-radio value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</a-radio>
					<a-radio value="application/json">application/json</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item :label="form.corsApi.label">
				<a-radio-group v-model:value="form.corsApi.value" defaultValue="all">
					<a-radio value="*">*</a-radio>
					<a-radio value="http://localhost:8080">http://localhost:8080</a-radio>
				</a-radio-group>
			</a-form-item>
			<a-form-item :label="form.corsType.label">
				<a-radio-group v-model:value="form.corsType.value" defaultValue="native">
					<a-radio value="native">原生xhr</a-radio>
				</a-radio-group>
			</a-form-item>

			<a-form-item :label="'cors请求类型为'">{{corsType}}</a-form-item>
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
import qs from "qs";

export default {
	name: "CorsCrossOrigin",
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			form: {
				anything: {
					label: "随便写点什么吧",
					value: "",
				},
				isDeliverCookie: {
					label: "是否携带cookie",
					value: false,
                },
                corsApi: {
					label: "HTTP响应头 Access-Control-Allow-Origin",
					value: "*",
				},
				contentType: {
					label: "HTTP请求头 Content-Type",
					value: "application/x-www-form-urlencoded",
				},
				httpType: {
					label: "HTTP请求头 Method",
					value: "post",
				},
				corsType: {
					label: "请求实现方式",
					value: "native",
				},
			},
			returnMsg: "",
		};
	},
	computed: {
		corsType() {
			return this.form.contentType.value === "application/json"
				? "非简单请求"
				: "简单请求";
		},
	},
	methods: {
		onSubmit() {
			this[this.form.corsType.value]();
		},
		native() {
			const URL = {
				post: "http://localhost:3000/api/testCorsPost",
				get: "http://localhost:3000/api/testCorsGet",
			};
			let xhr = new XMLHttpRequest(), // IE8/9需用window.XDomainRequest兼容
				context = this;

			xhr.withCredentials = this.form.isDeliverCookie.value; // 是否携带cookie。指定跨域 Access-Control 请求是否应当带有授权信息/cookie
			xhr.open(
				this.form.httpType.value,
				`${URL[this.form.httpType.value]}${
					this.form.httpType.value === "get"
						? "?" + qs.stringify(this.form)
						: ""
				}`
			);
			xhr.setRequestHeader("Content-Type", this.form.contentType.value); // 客户端告诉服务器实际发送的数据类型。修改content-type的值，可以设置发送简单请求/复杂请求。
			xhr.send(
				this.form.contentType.value === "application/json"
					? JSON.stringify(this.form)
					: qs.stringify(this.form)
			);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log("设置msg");
					context.returnMsg = xhr.responseText;
				}
			};
		},
	},
};
</script>

<style scoped>
.diy-form {
	width: 1750px;
}
</style>
