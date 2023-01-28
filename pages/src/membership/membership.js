{
  /* <script src="membership.js" type="text/javascript">

</script> */
}
const sirensID = "sirens-membership";
const hideQuantityInput = () => {
  const el = document.getElementById(sirensID);
  const wrapper = el.parentElement.parentElement.parentElement;
  wrapper.classList.add("sirens-membership-wrapper");
  console.log(sirensID);
  console.log(wrapper);
  console.log(wrapper.classList);
};

if (document.getElementsByClassName(sirensID)) {
  hideQuantityInput();
}
