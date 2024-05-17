<template>
  <el-drawer v-model="roleDrawer" :title="`分配【${permissionTitle}】的权限`" direction="rtl" :before-close="handleClose"
    size="400px">
    <el-tree ref="treeRef" :default-expand-all="defaultExpandAll" style="max-width: 600px" :data="data" show-checkbox
      node-key="id" :props="defaultProps">
      <template #default="{ node, data }">
        <span>
          <svg-icon v-if="data.meta.icon" :icon="filterIcon(data.meta.icon)" size="18px"></svg-icon>
          <svg-icon v-if="!data.meta.icon" icon="SwitchButton" size="15px"></svg-icon>
          <span style="margin-left: 10px;">{{ data.meta.title }}</span>
        </span>
      </template>
    </el-tree>

    <template #footer>
      <el-popconfirm @confirm="handleSubmit" width="auto" confirm-button-text="确定" cancel-button-text="取消" title="确定提交权限吗？">
        <template #reference>
          <el-button type="primary">提交</el-button>
        </template>
      </el-popconfirm>
      <el-button @click="handleCheckAll">全选/不选</el-button>
      <el-button @click="handleExpand">展开/收起</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>
</template>
<script setup lang='ts'>
import { menuListApi } from '@/api/system/menu';
import type { ResponseMenuListType } from '@/api/types/menuType';
import type { addRoleType } from '@/api/types/roleType';
import { getRolePermissionApi, saveRole } from "@/api/system/role"
import type { ElTree } from 'element-plus';
import { ref } from 'vue';
// 权限分配抽屉控制
const roleDrawer = ref<boolean>(false)
//抽屉标题
const permissionTitle = ref<string>('');
//角色id
const roleId = ref<number>(0)
//实例化树形控件
const treeRef = ref<InstanceType<typeof ElTree>>()
//选中的节点数据
const menuIds = ref<string[]>([])


//关闭抽屉
const handleClose = () => {
  roleDrawer.value = false;
}

//打开抽屉
const openPermisstion = async (data: addRoleType, id: number) => {
  roleDrawer.value = true;
  permissionTitle.value = data.roleName;
  roleId.value = id;
  await getMenuList();
  await initCheckedMenuList();
  await checkMenuNode();
}
//暴漏子组件openPermisstion方法
defineExpose({
  openPermisstion
})

const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = ref<ResponseMenuListType[]>([])

//控制的是树形控件展开/收起的状态
const defaultExpandAll = ref<boolean>(false)

//展开/收起按钮
const handleExpand = () => {
  defaultExpandAll.value = !defaultExpandAll.value;
  //调用递归
  changeTreeNodeStatus(treeRef.value!.root);
}

//递归
const changeTreeNodeStatus = (node: Node) => {
  for (let i = 0; i < node.childNodes.length; i++) {
    node.childNodes[i].expanded = defaultExpandAll.value;
    //判断node.childNodes[i]中是否还有子节点，如果有的话再调用自身进行
    if (node.childNodes[i].childNodes.length > 0) {
      changeTreeNodeStatus(node.childNodes[i]);
    }
  }
}

//控制全选全不选
const checked = ref<boolean>(false)

//全选全部选
const handleCheckAll = () => {
  checked.value = !checked.value;
  if (checked.value) {
    treeRef.value?.setCheckedNodes(data.value);
  } else {
    treeRef.value?.setCheckedNodes([]);
  }
}
//获取菜单列表
const getMenuList = async () => {
  const res = await menuListApi();
  data.value = res.data;
}

//过滤icon图标
const filterIcon = (icon: string) => {
  if (icon) {
    return icon.replace("ele-", '');
  }
}
// 获取选中的菜单权限数据
const initCheckedMenuList = async () => {
  try {
    const res = await getRolePermissionApi(roleId.value);
    menuIds.value = res.data;
  } catch (error) {
    console.log(error);
  }
}
//根据后台返回的数据选中对应的节点
const checkMenuNode = () => {
  menuIds.value.forEach((id: string) => {
    treeRef.value?.setChecked(id, true, false);
  })
}

//提交
const handleSubmit = async () => {
  try {
    // 获取选中的菜单子节点的ids
    const sonMenuIds = treeRef.value?.getCheckedKeys();

    // 获取半选中的父节点id
    const fatherMenuIds = treeRef.value?.getHalfCheckedKeys();

    // 合并选中的子节点id与半选中的父节点的id
    const snumIds=sonMenuIds?.concat(fatherMenuIds!);
    // const snumIds = [...sonMenuIds!, ...fatherMenuIds!];

    await saveRole(roleId.value,snumIds as string[]);

    handleClose();
  } catch (error) {
    console.log(error);

  }
}

</script>
<style lang='scss' scoped></style>