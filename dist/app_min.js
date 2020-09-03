var apiUrl=e=>`https://pokeapi.co/api/v2/pokemon/?offset=${e}&limit=131`,pokemonRepository=(()=>{var e=[],a=[];function t(e){a.push(e)}return{loadList:function(a){return fetch(a).then(e=>e.json()).then(a=>{a.results.forEach(a=>{!function(a){e.push(a)}({name:a.name,detailUrl:a.url})})}).then(()=>{e.forEach(e=>{fetch(e.detailUrl).then(e=>e.json()).then(e=>{for(var a=[],o=0;e.types.length>o;o++)a.push(e.types[o].type.name);t({name:e.name,img:e.sprites.front_default,bigImg:e.sprites.other.dream_world.front_default,height:e.height,weight:e.weight,types:a,id:e.id,stats:e.stats})}).catch(e=>{console.error(e)})})})},addListItem:function(e){var a,t,o,s;0===e.stats.length?(a="N/A",t="N/A",o="N/A",s="N/A"):(a=e.stats[0].base_stat,t=e.stats[1].base_stat,o=e.stats[2].base_stat,s=e.stats[5].base_stat);var i=()=>-1!==$.inArray("fire",e.types)?"#FA5543":-1!==$.inArray("poison",e.types)?"#A65B9E":-1!==$.inArray("psychic",e.types)?"#FA65B5":-1!==$.inArray("grass",e.types)?"#8CD851":-1!==$.inArray("ground",e.types)?"#E8C755":-1!==$.inArray("ice",e.types)?"#96F1FF":-1!==$.inArray("rock",e.types)?"#CDBC72":-1!==$.inArray("dragon",e.types)?"#8874FF":-1!==$.inArray("water",e.types)?"#56AEFF":-1!==$.inArray("bug",e.types)?"#C2D120":-1!==$.inArray("dark",e.types)?"#8A6955":-1!==$.inArray("fighting",e.types)?"#A75544":-1!==$.inArray("ghost",e.types)?"#7874D4":-1!==$.inArray("steel",e.types)?"#C4C2DB":-1!==$.inArray("flying",e.types)?"#79A4FF":-1!==$.inArray("electric",e.types)?"#FDE53C":-1!==$.inArray("fairy",e.types)?"#F9AEFF":void 0,n=$(".pokerow"),d=$(`<button type="button" class="pokeCard btn" data-name="${e.name}" data-bigImg="${e.bigImg?e.bigImg:e.img}" data-height="${e.height}" data-weight="${e.weight}" data-types="${e.types}" data-id="${e.id}" data-hp="${a}" data-attack="${t}" data-defense="${o}" data-speed="${s}" data-bgColor="${i()}" style="background-color:${i()}">\n          <div class="imgContainer">\n            <img class="pokeImg img-fluid" src="${e.img}" alt="${e.name}'s image" />\n          </div>\n          <div class="pokeName text-center text-wrap">${e.name}</div>\n      </button>`);n.append(d),$(window).mouseenter(()=>{$(".pokeImg").mouseenter(e=>{$(e.target).addClass("animate__heartBeat")}).mouseleave(e=>{$(e.target).removeClass("animate__heartBeat")})})},addDetails:t,getDetails:function(){return a},createModal:function(e){$(".modal_id").html(`#${e.id}`),$(".profile_height").html(`${e.height}M`),$(".profile_weight").html(`${(.1*e.weight).toFixed()}KG`),$(".stats_hp").html(e.hp),$(".stats_attack").html(e.attack),$(".stats_defense").html(e.defense),$(".stats_speed").html(e.speed),$(".modal_img").attr("src",e.bigimg),$(".modal_name").html(`<h1>${e.name}</h1>`),e.types.split(",").forEach(e=>{$(".modal_types").append(`<li class="${e} modal_type">${e}</li>`)})},pokemonList:a}})();function init(e){pokemonRepository.loadList(e).then(()=>{setTimeout(()=>{Array.from(new Set(pokemonRepository.pokemonList.map(JSON.stringify))).map(JSON.parse).sort((e,a)=>e.id-a.id).forEach(e=>{pokemonRepository.addListItem(e)}),$("#loader").hide()},3e3)})}$(window).click(e=>{if("pokeImg"==e.target.classList[0]||"pokeName"==e.target.classList[0]||"pokeCard"==e.target.classList[0]||"imgContainer"==e.target.classList[0]){var a,t=e.target;$(t).addClass("animate__bounceOut"),"DIV"==t.nodeName&&(a=t.parentNode.dataset,pokemonRepository.createModal(a,t)),"IMG"==t.nodeName&&(a=t.parentNode.parentNode.dataset,pokemonRepository.createModal(a,t)),"BUTTON"==t.nodeName&&(a=t.dataset,pokemonRepository.createModal(a,t)),setTimeout(()=>{$("#bsModal").modal("show")},650),$("#bsModal").on("show.bs.modal",function(){$(".modal").ready(()=>{$(".modal_img").hide(),$(".modal_name").hide(),$(".modal_id").hide(),$(".profile").hide(),$(".stats").hide(),$(".modal_closeBtn").hide(),$(".modal_type").hide(),$(".modal_type").each((e,a)=>{setTimeout(()=>{$(".modal_type").show(),$(a).addClass(`animate__bounceInLeft${e}`)},1500)}),setTimeout(()=>{$(".modal_closeBtn").show(),$(".modal_closeBtn").addClass("fadeInDown")},1e3),setTimeout(()=>{$(".modal_img").show(),$(".modal_name").show(),$(".modal_name").addClass("bounceOutDown"),$(".modal_img").addClass("bounceInDown")},500),setTimeout(()=>{$(".modal_name").hide(),$(".modal_img").addClass("tada"),$(".modal_id").show(),$(".modal_id").addClass("bounceInDown")},800),setTimeout(()=>{$(".modal_name").show(),$(".modal_name").addClass("rollIn")},950),setTimeout(()=>{$(".profile").show(),$(".stats").show(),$(".profile").addClass("fadeIn"),$(".stats").addClass("fadeIn")},2e3)})})}$("#bsModal").on("hide.bs.modal",function(){$(t).removeClass("animate__bounceOut"),$(".modal_type").removeClass("animate__bounceInLeft"),$(".modal_closeBtn").removeClass("fadeInDown"),$(".modal_name").removeClass("bounceOutDown"),$(".modal_img").removeClass("bounceInDown"),$(".modal_img").removeClass("tada"),$(".modal_id").removeClass("bounceInDown"),$(".modal_name").removeClass("rollIn"),$(".profile").removeClass("fadeIn"),$(".stats").removeClass("fadeIn"),$(".modal_type").remove()})}),window.addEventListener("scroll",()=>{const{scrollTop:e,scrollHeight:a,clientHeight:t}=document.documentElement;if(e+t>=a&&0!==e){var o=Array.from(new Set(pokemonRepository.pokemonList.map(JSON.stringify))).map(JSON.parse).length;pokemonRepository.loadList(apiUrl(o)).then(()=>{$("#loader").show(),setTimeout(()=>{Array.from(new Set(pokemonRepository.pokemonList.map(JSON.stringify))).map(JSON.parse).splice(o).sort((e,a)=>e.id-a.id).forEach(e=>{pokemonRepository.addListItem(e)}),$("#loader").hide()},3e3)})}}),init(apiUrl(0));