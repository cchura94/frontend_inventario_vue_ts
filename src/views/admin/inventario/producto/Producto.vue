<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo Producto" icon="pi pi-plus" class="mr-2" @click="openNew" />
                </template>
    
                <template #end>
                    
                    <FileUpload mode="Importar" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                :value="products"
                lazy
                :loading="cargando"
                :totalRecords="totalRecords"
                dataKey="id"
                :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
                @page="onPage($event)"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestión Productos</h4>

                        <Select v-model="sucursal_id" :options="sucursales" optionLabel="nombre" option-value="id" placeholder="Sucursal" class="w-full md:w-56" @change="funObtenerAlmacenes()" />
                        <Select v-model="almacen_id" :options="almacenes" optionLabel="nombre" option-value="id" placeholder="Almacen" class="w-full md:w-56" @change="obtenerListaProducto()" />
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Buscar..." v-model="buscar" @keypress.enter="obtenerListaProducto()" />
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
                <Column field="nombre" header="Nombre Producto" sortable style="min-width: 16rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <img :src="`https://www.electronicospormayorbolivia.com/wp-content/uploads/2022/01/1-3.jpg?${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="precio_venta_actual" header="Precio" sortable style="min-width: 4rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio_venta_actual) }}
                    </template>
                </Column>
                <Column field="categoria.nombre" header="Categoria" sortable style="min-width: 8rem"></Column>
                
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle de Producto" :modal="true">
            <div class="flex flex-col gap-6">
                <!--<img v-if="product.imagen" :src="`https://primefaces.org/cdn/primevue/images/product/${product.imagen}`" :alt="product.image" class="block m-auto pb-4" />-->
                <div>
                    <label for="name" class="block font-bold mb-3">Nombre</label>
                    <InputText id="name" v-model.trim="product.nombre" required="true" autofocus :invalid="submitted && !product.nombre" fluid />
                    <small v-if="submitted && !product.nombre" class="text-red-500">El nombre es obligatorio.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Descripción</label>
                    <Textarea id="description" v-model="product.descripcion" required="true" rows="3" cols="20" fluid />
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                        <label for="cb" class="block font-bold mb-3">Codigo Barra</label>
                        <InputText id="cb" v-model="product.codigo_barra" fluid />
                    </div>
                    <div class="col-span-4">
                        <label for="um" class="block font-bold mb-3">Unidad Medida</label>
                        <InputText id="um" v-model="product.unidad_medida" fluid />
                    </div>
                    <div class="col-span-4">
                        <label for="marca" class="block font-bold mb-3">Marca</label>
                        <InputText id="marca" v-model="product.marca" fluid />
                    </div>
                </div>

                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Estado</label>
                    <Select id="inventoryStatus" v-model="product.estado" :options="statuses" optionLabel="Estado" placeholder="estado" fluid></Select>
                </div>

                <div>
                    <span class="block font-bold mb-4">Categoria</span>
                    <div class="grid grid-cols-12 gap-4">

                        <div class="flex items-center gap-2 col-span-6" v-for="cat in categorias" :key="cat.id">
                            <RadioButton :id="`category${cat.id}`" v-model="product.categoria_id" name="category" :value="`${cat.id}`" />
                            <label for="category">{{cat.nombre}}</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Precio venta</label>
                        <InputNumber id="price" v-model="product.precio_venta_actual" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Stock minimo</label>
                        <InputNumber id="quantity" v-model="product.stock_minimo" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" @click="guardarProducto" />
            </template>
        </Dialog>

                
            <pre>{{ products }}</pre>
        </div>

    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import productoService from '../../../../services/producto.service';
    import sucursalService from '../../../../services/sucursal.service';
    import almacenService from '../../../../services/almacen.service';
    import { getCategorias } from '../../../../services/categoria.service'

    const products = ref([]);
    const product = ref({});
    const sucursales = ref([]);
    const almacenes = ref([]);
    const categorias = ref([]);

    const sucursal_id = ref(-1);
    const almacen_id = ref(null);
    const cargando = ref(false);
    const totalRecords = ref(0);
    const lazyParams = ref({})
    const buscar = ref("")
    const productDialog = ref(false);

    onMounted(() => {
        obtenerListaProducto();
        obtenerSucursales();
        obtenerCategorias();

        lazyParams.value = {
            first: 0,
            rows: 10
        }
    });

    async function obtenerCategorias(){
        const {data} = await getCategorias()
        categorias.value = data;
    }

    async function obtenerListaProducto(){
        cargando.value = false
        // const page = lazyParams.value.page?lazyParams.value.page:1;

        const {data} = await productoService.getProductos(almacen_id.value, lazyParams.value.page + 1, lazyParams.value.rows, buscar.value );
        products.value = data.data;
        console.log(products.value)
        totalRecords.value = data.total;
    }

    async function obtenerSucursales(){
        const {data} = await sucursalService.getSucursales();
        sucursales.value = data;
    }

    async function funObtenerAlmacenes(){
        products.value = [];
        const {data} = await almacenService.getAlmacenes(sucursal_id.value);
        almacenes.value = data;
    }

    const formatCurrency = (value) => {
        if(value)
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return;
    };

    const onPage = (event) => {
        console.log(event);
        lazyParams.value = event;
        obtenerListaProducto()
    }

    const openNew = () => {
        productDialog.value = true;
    }
    
    const guardarProducto = async () => {
        product.value.fecha_registro = new Date();
        const {data} = await productoService.guardarProducto(product.value);
        productDialog.value = false;
        obtenerListaProducto();
        product.value = {};
    }
</script>