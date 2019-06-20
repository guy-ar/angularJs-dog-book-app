app.factory("breedSrv", function($log, $http, $q) {

    let breeds = [];
    let breedList = [];
    const PREFIX = "https://dog.ceo/api/breed/";
    const SUFFIX_IMG = "/images/random";
    const BREED_LIST_URL = "https://dog.ceo/api/breeds/list/all"

    function Breed(name, imageUrl){        
        this.name = name;
        this.image = imageUrl;        
    };

    function getBreeds(){
        // initiate the data before getting it back from DB
        breeds = [];
        breedList = [];
        let async = $q.defer();

        $http.get(BREED_LIST_URL).then(
            function (res){
                // on success
                let message = res.data.message;
                let breeds = Object.keys(message); 
                console.log(breeds);
                
                
                for (let i = 0, len = breeds.length; i<len; i++)
                {
                    getBreedImage(breeds[i]);
                }
                $log.info(breedList);
                async.resolve(breedList);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                async.reject(err);
            });
        return async.promise;
    }
    function getBreedImage(breedName){
        let fullUrl = PREFIX + breedName + SUFFIX_IMG;
        let asyncInt = $q.defer();
        $http.get(fullUrl).then(
            function(resImg){
                $log.info("Breed Name:" + breedName);
                //let urlParams = resImg.data.message.split("/")
                let breed = new Breed(breedName, resImg.data.message);
                breedList.push(breed);
                asyncInt.resolve(breedList);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                asyncInt.reject(err);
            });

    }
    return {
        getBreeds: getBreeds
    }
});