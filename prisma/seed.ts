import {PrismaClient} from '@prisma/client'; const prisma=new PrismaClient();
async function main(){
 await prisma.setting.upsert({where:{id:1},update:{},create:{id:1}});
 const grocery=await prisma.category.upsert({where:{name:'মুদি'},update:{},create:{name:'মুদি',slug:'grocery',sortOrder:1}});
 await prisma.subcategory.upsert({where:{categoryId_name:{categoryId:grocery.id,name:'চাল-ডাল'}},update:{},create:{categoryId:grocery.id,name:'চাল-ডাল',slug:'rice-dal'}});
 await prisma.subcategory.upsert({where:{categoryId_name:{categoryId:grocery.id,name:'তেল-মসলা'}},update:{},create:{categoryId:grocery.id,name:'তেল-মসলা',slug:'oil-spice'}});
 await prisma.deliveryArea.upsert({where:{name:'ঢাকা সিটি'},update:{},create:{name:'ঢাকা সিটি',charge:80,sortOrder:1}});
 await prisma.deliveryArea.upsert({where:{name:'ঢাকার বাইরে'},update:{},create:{name:'ঢাকার বাইরে',charge:130,sortOrder:2}});
 if(await prisma.product.count()===0){
  await prisma.product.create({data:{name:'প্রিমিয়াম চাল ৫ কেজি',slug:'premium-rice-5kg',category:'মুদি',subcategory:'চাল-ডাল',regularPrice:420,salePrice:390,discount:7,stock:30,sku:'RICE-5KG',details:'দৈনন্দিন ব্যবহারের জন্য মানসম্মত চাল।',featured:true,offer:true}});
  await prisma.product.create({data:{name:'সয়াবিন তেল ২ লিটার',slug:'soybean-oil-2l',category:'মুদি',subcategory:'তেল-মসলা',regularPrice:390,salePrice:365,discount:6,stock:25,sku:'OIL-2L',details:'রান্নার জন্য মানসম্মত সয়াবিন তেল।',offer:true}})
 }
}
main().finally(()=>prisma.$disconnect())
