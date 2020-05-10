const MongoClient = require('mongodb').MongoClient;

async function selectFromDB(client, apellidoInventor){
    const collectionInventors  =  await client.db('inventors').collection('inventor').findOne({last : apellidoInventor})
    return new Promise(resolve => {
    console.log("Documentos:");
    console.log(collectionInventors)
        resolve();
      })
    .catch((error) => {
        console.log('errores encontrados en el listado.');
    })
};

async function InsertToDB(client, inventor){
    const resultados  =  await client.db('inventors').collection('inventor').insertOne(inventor);
    return new Promise(resolve => {
        console.log('documento ingresado satisfactoriamente')
        resolve();
    })
    .catch((error) => {
        console.log('errores encontrados en el ingreso');
    })
};

async function updateFromDB(client, lastname, document ){
    const resultados  =  await client.db('inventors').collection('inventor').updateOne(
        {last : lastname},
        {$set : document})
    return new Promise(resolve => {
    console.log(`${resultados.matchedCount} documentos`)
    console.log('documento actualizado satisfactoriamente')
    resolve();
      })
    .catch((error) => {
        console.log('errores encontrados en la actualizacion');
    })
};

async function deleteFromDB(client, inventor){
    const resultados  =  await client.db('inventors').collection('inventor').deleteOne({last : inventor});
    return new Promise(resolve => {
        console.log('documento eliminiado satisfactoriamente')
        resolve();
    })
    .catch((error) => {
        console.log('errores encontrados en la eliminacion');
    })
};
    

async function main(){
    
    const uri = "mongodb+srv://flavista:Ferrt4272@cluster0-namhx.gcp.mongodb.net/test";
    const client = new MongoClient(uri, {useUnifiedTopology : true});
 
    try {
        await client.connect();
        await  InsertToDB(client, inventor = {
            first: "Graham",
            last: "Bell",
            year: 1942
        });
        await  selectFromDB(client, "Bell");
        await  updateFromDB(client, "Bell", {
            year: 1944
        });
        await  selectFromDB(client, "Bell");
        await  deleteFromDB(client, "Bell");
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

