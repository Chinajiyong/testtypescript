import {Child,   Color} from './testmaster';

async function CallSave() {
    var child = new Child("TestChild");
    child.Property1 = Color.White;
    child.Property2 = "Test 3";
    let address = {
        Address1: "kai zhu,No.176", Address2: "Chestenter Road",
        Town: "Cambridge", Region: "England", PostalCode: "DT9 6NX"
    };
    child.Address = address;

    //console.log(JSON.stringify(child.Address));
    console.log(child.Id);
    try {
        let result = await child.Save();
        console.log("the result:" + result); 
    } catch (error) {
        //throw new Error(error);
        console.log(error);
    }
}

CallSave();