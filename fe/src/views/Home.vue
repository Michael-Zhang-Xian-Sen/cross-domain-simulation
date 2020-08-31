<template>
	<div id="home">
		<ul>
			<li v-for="crossOriginItem in crossOriginList">
				<router-link :to="crossOriginItem.to">{{crossOriginItem.label}}</router-link>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "Home",
	components: {},
	data() {
		return {
			crossOriginList: [
				{
					label: "通过jsonp跨域",
					to: "/home/jsonp-cross-origin",
				},
				{
					label: "iframe+form跨域",
					to: "/home/iframe-cross-origin",
				},
				{
					label: "跨域资源共享（CORS）",
					to: "/home/cors-cross-origin",
				},
				// {
				// 	label: "nginx代理跨域（待实现）",
				// 	to: "",
				// },
				// {
				// 	label: "nodejs中间件代理跨域（待实现）",
				// 	to: "",
				// },
				// {
				// 	label: "WebSocket协议跨域（待实现）",
				// 	to: "",
				// },
			],
		};
	},
};
</script>

<style>
#home {
	padding: 30px;
}
</style>
