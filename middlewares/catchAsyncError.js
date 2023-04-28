// to save from multiple uses of try-catch
// export const catchAsyncError=()=>{
//     return ()=>
// }

// <========= OR ============>

// both are same

export const catchAsyncError = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next);
};
