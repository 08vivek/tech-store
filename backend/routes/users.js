const User = require('../models/user.model');
UserSession = require('../models/UserSession.model');
const router = require('express').Router();


/*router.route('/').get((req,res) => {
    Products.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: '+err));
});
*/

router.route('/account/signup').post((req,res,next) => {
	const {body} = req;
	const {password,username} = body;
	let {email} = body;
	// if(!username){
	// 	return res.send({
	// 		success: false,
	// 		message: 'Error: userName cannot be blank.'
	// 	});
	// }
	// if(!email){
	// 	return res.send({
	// 		success: false,
	// 		message: 'Error: email cannot be blank.'
	// 	});
	// }
	// if(!password){
	// 	return res.send({
	// 		success: false,
	// 		message: 'Error: password cannot be blank.'
	// 	});
	// }
		
	email = email.toLowerCase();
		//Steps:
		//1. verify email doesn't exist
		// 2.save
	User.find({email: email},(err,previousUsers) => {
		if(err){
			return res.send({
				success: false,
				message: 'Error: Server error'
			});
		}else if(previousUsers.length > 0){
			return res.send({
				success: false,
				message: 'Error: Account already exist.'
			});
		}
		
		//Save new userAgent
		const newUser = new User();
			
		newUser.email = email;
		newUser.username= username;
		newUser.password = newUser.generateHash(password);
		newUser.save((err,user) => {
			if(err){
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			}
			res.send({
				success: true,
				message: 'signed up'
				});
			});
	});
});
	
	/*
	*		Sign in
	*
	*/
	
	 
router.route('/account/signin').post((req,res,next) => {
	const {body} = req;
	const {password} = body;
	let {email} = body;
	 
	// if(!email){
	// 	return res.send({
	// 		success: false,
	// 		message: 'Error: email cannot be blank.'
	// 	});
	// }
	// if(!password){
	// 	return res.send({
	// 		success: false,
	// 		message: 'Error: password cannot be blank.'
	// 	});
	// }
	email = email.toLowerCase();

	User.find({email:email},(err,users) => {
		if(err){
			return res.send({
				success: false,
				message: 'Error: server error'
			});
		}
		if(users.length !=1){
			return res.send({
				success: false,
				message: 'Error: Invalid'
			});
		}
		const user = users[0];
		if(!user.validPassword(password)){
				return res.send({
					success: false,
					message: 'Incorrect Password'
				});
		}
		//othervise correct user
		const userSession = new UserSession();
		userSession.userId = user._id;
		userSession.save((err,doc) => {
			if(err){
				return res.send({
					success: false,
					message: 'Error: server error'
				});
			}
			return res.send({
				username: user.username,
				sucess: true,
				message: 'Valid sign in',
				token: doc._id
			});
		});
	});
});
	/*
	*
	*	Verify
	*
	*/


router.route('/account/verify').get((req,res,next) => {
	//get the token
	const {query} = req;
	const {token} = query;
	
	//verify the token is one of a kind and not delted
	
	UserSession.find({
		_id: token,
		isDeleted: false
	},(err,sessions) => {
		if(err){
			return res.send({
				success: false,
				message: 'Error: Server error'
			})
		}
		if(sessions.length !=1){
			return res.send({
				success: false,
				message:'Error: Invlaid'
			});
		}else{
			return res.send({
				success: true,
				message: 'Good'
			});
		}
	});
});
 
	/*
	*
	*	logout
	*
	*/


router.route('/account/logout/:token').delete((req,res,next) => {
	//get the token
	/*const {query} = req;
	const {token} = query;
	*/
	//verify the token is one of a kind and not delted
	
	UserSession.findByIdAndDelete(req.params.token)
	        .then(() => res.json('logged out'))
		    .catch(err => res.status(400).json('Error: '+err));




	/*UserSession.findOneAndUpdate({
		_id: token,
		isDeleted: false
	},{$set:{isDeleted:true}},null,(err,sessions) => {
		if(err){
			return res.send({
				success: false,
				message: 'Error: Server error'
			})
		}
		
		return res.send({
			success: true,
			message: 'Good'
		});
	});
	*/
});

module.exports = router;