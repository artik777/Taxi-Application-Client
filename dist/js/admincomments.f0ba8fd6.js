(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admincomments"],{"5d94":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.comments,"hide-default-footer":""},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:"",color:"orange accent-2 black--text"}},[n("v-toolbar-title",[e._v("All comments")]),n("v-spacer"),n("v-btn",{on:{click:e.onRefresh}},[e._v("refresh")])],1)]},proxy:!0},{key:"item.actions",fn:function(t){var o=t.item;return[n("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(o,o._id)}}},[e._v("mdi-delete")])]}}],null,!0)})],1)},a=[],r=(n("c975"),n("a434"),n("d3b7"),n("5530")),c=n("2f62"),s={data:function(){return{name:"",comment:"",timestamp:new Date,options:{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1},items:[],loading:!0,valid:!0,headers:[{text:"Name",sortable:!1,value:"name"},{text:"Comment",sortable:!1,value:"comment"},{text:"Datetime",sortable:!1,value:"timestamp"},{text:"Actions",value:"actions",sortable:!1}]}},computed:Object(r["a"])(Object(r["a"])({},Object(c["b"])({comments:"getComments"})),{},{error:function(){return this.$store.getters.error}}),methods:{deleteItem:function(e,t){var n=this.comments.indexOf(e);console.log(n),confirm("Are you sure you want to delete this item?")&&this.comments.splice(n,1)&&fetch("https://taxicodeacademy.herokuapp.com/api/comments/"+t,{method:"DELETE"}).then((function(e){return e.json()}))},onRefresh:function(){this.$store.dispatch("fetchComments")}}},i=s,m=n("2877"),l=n("6544"),u=n.n(l),d=n("8336"),f=n("a523"),h=n("8fea"),p=n("132d"),b=n("2fa4"),v=n("71d9"),x=n("2a7f"),k=Object(m["a"])(i,o,a,!1,null,null,null);t["default"]=k.exports;u()(k,{VBtn:d["a"],VContainer:f["a"],VDataTable:h["a"],VIcon:p["a"],VSpacer:b["a"],VToolbar:v["a"],VToolbarTitle:x["a"]})}}]);
//# sourceMappingURL=admincomments.f0ba8fd6.js.map