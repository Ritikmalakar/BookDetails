import Book from "../models/book.js";

  export async function bookDetail(req, res) {

  try {

    const bookData = { ...req.body };

    const newBook =
      await Book.create(bookData);

    res.status(201).send({
      success: true,
      message: "Book Added Successfully",
      data: newBook,
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      message: "Failed",
    });

  }}

 export async function allBook(req,res){

  try{

    const book = await Book.find({});

    res.status(200).send({
      success:true,
      message:"success",
      bookList: book
    });

  }catch(err){

    console.log(err);

    res.status(500).send({
      success:false,
      message:"error"
    });

  }
}

export async function bookDelete(req,res){
  try{
const deleted=await Book.deleteOne({_id:req.body.id});
console.log("deleted");
res.status(200).send({
  success:true,
  message:"deleted succcessfully"
})

  }catch(err){
    console.log(err);
    res.status(500).send({
      success:false,
      message:"error"
    })
  }
}

export async function updatePage(req, res) {

  try {

    const update = await Book.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "updated successfully",
      update,
    });

  } catch (err) {

    console.log(err);

    res.status(500).send({
      success: false,
      message: "error",
    });
  }
}