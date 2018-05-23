// import entire SDK
import AWS = require("aws-sdk");
///import { AWS } from 'aws-sdk';
const uuidv4 = require("uuid/v4");

//Credentials
AWS.config.update({
  region: "us-east-2",
  accessKeyId: "AKIAJDHOQE7BJNX2E65Q",
  secretAccessKey: "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"
});

//var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
//var s3 = new AWS.S3();
var documentClient = new AWS.DynamoDB.DocumentClient();

export class Master {
  Id: string;
  Name: string;
  constructor(name: string) {
    this.Name = name;
    this.Id = uuidv4();
  }
  async Save(awsDocuement: IAWSDocument) {
    /*
    var params = {
      AttributeDefinitions: [
        {
          AttributeName: 'TS_ID',
          AttributeType: 'S'
        },
        {
          AttributeName: 'TS_NAME',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'TS_ID',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'TS_NAME',
          KeyType: 'RANGE'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      },
      TableName: 'TS_LIST',
      StreamSpecification: {
        StreamEnabled: false
      }
    };
    //create table
    ddb.createTable(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        return false;
      } else {
        return true;
      }
    });
    */


    var params = {
      TableName: "TS_LIST",
      Item: {
        TS_ID: awsDocuement.Id,
        TS_NAME: awsDocuement.Name,
        TS_PROPERTY1: Color[awsDocuement.Property1],
        TS_PROPERTY2: awsDocuement.Property2,
        TS_PROPERTY3: awsDocuement.Property3
        //'TS_PROPERTY4': ts.Property4,
      }
    };

    // Call DynamoDB to put the item into the table
    var putObjectPromise = documentClient.put(params).promise();
    var p = putObjectPromise.then(function(data){
      return new Promise<boolean>(reslove => {
        reslove(true);
      });
     //return true;
    }).catch(function(err){
      console.log(err);
      return new Promise<boolean>(reslove => {
        reslove(false);
      });
      //return false;
    })

    return p;
  }
}

export class Child extends Master {
  Property1: Color;
  Property2: string;
  Property3: IAddress;
  Property4: string;
  constructor(name: string) {
    super(name);
  }
  public get Address(): IAddress {
    return this.Property3;
  }
  public set Address(address: IAddress) {
    this.Property3 = address;
  }
  async Save() {
    const doc: IAWSDocument = {
      Id: this.Id,
      Name: this.Name,
      Property1: this.Property1,
      Property2: this.Property2,
      Property3: this.Address, 
    };
    return super.Save(doc);
  }
}

export interface IAddress {
  Address1: string;
  Address2: string;
  Town: string;
  Region: string;
  PostalCode: string;
}

export interface IAWSDocument {
  Id: string;
  Name: string;
  Property1: Color;
  Property2: string;
  Property3: IAddress;
}

export enum Color {
  Red,
  Green,
  Blue,
  White,
  Purple
}
