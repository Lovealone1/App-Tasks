<template>
    <div class="mt-3">
      <h3>Listado de tareas</h3>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Descripción</th>
            <th class="text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tasks" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <v-btn icon="mdi-pencil" variant="text" @click="editTask(item)"></v-btn>
              <v-btn icon="mdi-delete-off" variant="text" @click="showDeleteConfirmationDialog = true; deletingTask = item"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <tasks-edit-dialog v-if="editingTask != null" :dialog="isEdit" :task="editingTask" />
    </div>
  
    <!-- Cuadro de diálogo de confirmación para eliminar tarea -->
    <v-dialog v-model="showDeleteConfirmationDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar esta tarea?</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteTaskConfirmation(deletingTask)">Confirmar</v-btn>
          <v-btn @click="showDeleteConfirmationDialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import axios from "axios";
  
  const tasks = ref([]);
  const isEdit = ref(false);
  const editingTask = ref(null);
  const showDeleteConfirmationDialog = ref(false);
  const deletingTask = ref(null);
  
  onBeforeMount(() => {
    loadTasks();
  });
  
  const loadTasks = async () => {
    const url = "http://localhost:3001/tasks";
    const { data } = await axios.get(url);
    tasks.value = data;
  };
  
  const deleteTask = async (item) => {
    const url = `http://localhost:3001/tasks/${item.id}`;
    const { data } = await axios.delete(url);
    loadTasks();
  };
  
  const deleteTaskConfirmation = async (item) => {
    if (item) {
      await deleteTask(item);
      showDeleteConfirmationDialog.value = false;
    }
  };
  
  const editTask = async (item) => {
    isEdit.value = true;
    editingTask.value = { ...item };
  };
  </script>
  