const loadData = async(isClicked)=>{
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const tools = data.data.tools;

    // making sort array
    const sortArray = [...tools].sort((a,b)=>{
      return new Date(a.published_in) - new Date(b.published_in)
    })

    displayData(tools, isClicked)

    document.getElementById('sort').addEventListener('click', ()=>{
      displayData(sortArray, isClicked)
    })
}

function displayData(tools, isClicked){
    const container = document.getElementById('cards-container');
    container.innerHTML =''

    if(tools.length > 6 && !isClicked){
      document.getElementById('showBtn').classList.remove('hidden')
    }else{
      document.getElementById('showBtn').classList.add('hidden')
    }
    !isClicked ? tools = tools.slice(0, 6) : tools

    tools.forEach(tool => {
        const features = tool.features;
        const htmlcode =`
        <div class="card bg-green-100 shadow-xl p-2 cursor-pointer">
          <figure class="h-[200px]">
            <img src="${tool.image}" alt="Ai Image" />
          </figure>
          <div class="card-body">
            <h2 id="feature" class="card-title text-black font-bold">Features</h2>
            <ol id="list" class="text-black list-decimal">
            <!-- Dynamic Features list Here -->
            ${features.map(item => `<li>${item}</li>`).join('')}
            </ol>
            <hr class="my-2" />
            <div class="flex justify-between items-center">
              <div class="flex flex-col text-black">
                <h3 id="name" class="font-bold">${tool.name}</h3>
                <span id="date">${tool.published_in}</span>
              </div>
              <div onclick="showDetails('${tool.id}')">➡️</div>
            </div>
          </div>
        </div>
        `
        container.innerHTML += htmlcode
    });
}
function showAll(){
  loadData(true)
}

async function showDetails(id){
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
  const details = data.data;
  displayDetails(details)
}
function displayDetails(details){
  const modal = document.getElementById('modal-container')
  // console.log(details);
  modal.innerHTML = `
  <div class="flex-1">
              <p>
                ${details.description}
              </p>
              <div class="grid grid-cols-3 gap-2 my-2">
                <div
                  class="bg-green-100 shadow-xl p-2 rounded text-black"
                >
                <h3>${details?.pricing ? details?.pricing[0]?.plan : 'no data'}</h3>
                <p>${details?.pricing ? details?.pricing[0]?.price : 'no data'}</p>
                
                </div>
                <div
                  class="bg-green-100 shadow-xl p-2 rounded text-black"
                >
                <h3>${details?.pricing ? details?.pricing[1]?.plan : 'no data'}</h3>
                <p>${details?.pricing ? details?.pricing[1]?.price : 'no data'}</p>
                </div>
                <div
                  class="bg-green-100 shadow-xl p-2 rounded text-black"
                >
                <h3>${details?.pricing ? details?.pricing[2]?.plan : 'no data'}</h3>
                <p>${details?.pricing ? details?.pricing[2]?.price : 'no data'}</p>
                </div>
              </div>
              <div class="flex gap-2 justify-between">
                <div>
                  <h3 class="my-2">Features</h3>
                  <ul class="list-disc">
                    <li>${details.features['1']?.feature_name}</li>
                    <li>${details.features['2']?.feature_name}</li>
                    <li>${details.features['3']?.feature_name}</li>
                  </ul>
                </div>
                <div class="flex-end">
                  <h3 class="my-2">Integrations</h3>
                  <ul class="list-disc">
                    ${
                      details.integrations ? details.integrations.map(item => `<li>${item}</li>`).join('') : 'no data'
                    }
                  </ul>
                </div>
              </div>
            </div>
            <!-- second -->
            <div class="text-center flex-1">
              <div class="h-[200px]">
                <img src="${details.image_link[0]}" />
              </div>
              <h2 class="text-xl font-bold">${details.input_output_examples ? details.input_output_examples[0]?.input : 'no data'}</h2>
              <p>${details.input_output_examples ? details.input_output_examples[0]?.output : 'no data'}</p>
            </div>
            <!-- second -->
  `
  // show modal
  detailsModal.showModal()
}

loadData()



