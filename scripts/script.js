
var userURL = 'https://api.github.com/users/awolgamott' //putting my github profile via github api in a variable

var repoURL = 'https://api.github.com/users/awolgamott/repos' //putting my github repos via github api in a variable 

var makeProfileHTML = function(awoObj){ //takes in a single object of the profile array and converts the object into html format
	var getHTML = '' //running total
	getHTML += '<div class="profile">' //adding html string to running total
	getHTML += '<img class="profilePic" src="' + awoObj.avatar_url +  '"">' //put the profile pic inside img html
	getHTML += '<h2 class="name">' + awoObj.name + '</h2>'
	getHTML += '<h3 class="userName">' + awoObj.login + '</h3>'
	getHTML += '<p class="bio">' + awoObj.bio + '</p>'
	getHTML += '<ul>' + '<li id="location">' + awoObj.location + '</li>'
	getHTML += '<li id="email">' + '<a href="mailto: ' + awoObj.email + '">' + awoObj.email + '</a>' + '</li>' //putting email into proper html format so that it looks like a link   
	getHTML += '<li id="blog">' + '<a href="' + awoObj.blog + '">' + awoObj.blog + '</a>' + '</li>' + '</ul>' //putting website into proper html format so that it looks like a link   
	getHTML += '</div>'
	return getHTML
}

var makeRepoHTML = function(awoRepoObj){ //takes in a single object of the repo array and converts the object into html format
	var getHTML = '' //running total
	getHTML += '<div class="repo">' //adding html string to running total
	getHTML += '<h2 class="repoName">' + awoRepoObj.name + '</h2>' //adding html string plus pulling api info and adding it to running total
	getHTML += '<h3 class="repoDescription">' + awoRepoObj.description + '</h3>'
	getHTML += '<p class="language">' + awoRepoObj.language + '</p>'
	getHTML += '<p class="updated">' + awoRepoObj.updated_at + '</p>'
	getHTML += '</div>'
	return getHTML //return entire running total
}

var handleProfileResponse = function(profileObj) { //
	var profileContainerNode = document.querySelector('.profileContainer') //grabbing the location of where we want to put profile html
	profileContainerNode.innerHTML = makeProfileHTML(profileObj) //convert all makeprofilehtml to string
}

var handleRepoResponse = function(repoObj) {
	var allReposHTML = ''
	var repoContainerNode = document.querySelector('.repoContainer') //grabbing the location of where we want to put profile html
	var reposArray = repoObj //processes through the whole repo array
		for(var index = 0; index < reposArray.length; index = index + 1){
			allReposHTML +=  makeRepoHTML(reposArray[index]) 
		}
		repoContainerNode.innerHTML = allReposHTML //convert all makerepohtml to string
}

var profilePromise = $.getJSON(userURL) //actually make api call to userURL
	profilePromise.then(handleProfileResponse) //when response comes back send profileObj to handleProfileResponse
var repoPromise = $.getJSON(repoURL) //actually make api call to repoURL
repoPromise.then(handleRepoResponse) //when response comes back send repoObj to handleRepoResponse