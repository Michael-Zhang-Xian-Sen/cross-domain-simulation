<template>
	<div class="diy-form">
		<a-page-header title="通过Iframe+form的方式进行跨域" />
		<a-form :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-item label="随便写点什么吧">
				<a-input v-model:value="form.anything" />
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
export default {
	name: "IframeCrossOrigin",
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			form: {
				anything: "",
			},
			returnMsg: "",
		};
	},
	methods: {
		onSubmit() {
			let iframe = document.createElement("iframe"), // 首先创建一个用来发送数据的iframe.
				form = document.createElement("form"),
				node = document.createElement("input"),
				context = this,
				data = {
					anything: this.form.anything,
				};

			// 设置并添加iframe至dom树
			iframe.name = "iframePost";
			iframe.style.display = "none";
			iframe.src = "http://localhost:8080";
			iframe.addEventListener("load", function (res) {
				// 暂时还没有解决无法接收后台数据的问题。
				context.returnMsg = res;
				console.log(res);
			});
			document.body.appendChild(iframe);

			// 设置并添加form至iframe
			form.action = "http://localhost:3000/api/testPost";
			form.target = iframe.name; // 在提交表单之后，在指定的iframe中显示响应信息
			form.method = "post";
			for (let prop in data) {
				node.name = prop;
				node.value = data[prop].toString();
				form.appendChild(node.cloneNode());
			}
			form.style.display = "none";
			document.body.appendChild(form);
			form.submit(); // 发送form

			document.body.removeChild(form); // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
		},
	},
};
</script>

<style scoped>
.diy-form {
	width: 900px;
}
</style>
