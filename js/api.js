
const videoContainer = document.getElementById('video-container');
const buttonContainer = document.getElementById('button_container');
let itemList = [];
let activeId = 1000;
const loadItems = async (id) => {
  loadButton();
  activeId = id;
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  const data = await res.json();
  const temp = data.data;
  itemList = temp;
  makeCardList(temp);
}

const sortByView = async () => {
  itemList = itemList.sort(function (a, b) {
    return Number(b.others.views.split('K')[0]) - Number(a.others.views.split('K')[0]);
  });
  makeCardList(itemList);
}

const loadButton = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
  const data = await res.json();
  const temp = data.data;
  buttonContainer.innerHTML = ``;
  for (let i = 0; i < temp.length; i++) {
     
    if (temp[i].category_id == activeId) {
      buttonContainer.innerHTML += `
        <div>
        <button
          class="border-0 btn btn-outline px-8 py-[0px] bg-[#FF1F3D] text-white"
          onclick='loadItems(${temp[i].category_id})'
        >
          ${temp[i].category}
        </button>
      </div>
       `
    }
    else {
      buttonContainer.innerHTML += `
            <div>
            <button class="border-0 btn btn-outline px-8 py-[0px] bg-[#25252526]"
            onclick='loadItems(${temp[i].category_id})'>
            ${temp[i].category}
            </button>
            </div>
           `
    }
  }

}

const makeCardList = temp => {
  videoContainer.innerHTML = ``;
  if (temp.length === 0) {
    videoContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center w-full col-span-4 py-8">
        <img src="/Image/Icon.png" alt=""/>
        <h4 class="max-w-[433px] mx-auto text-[#171717] mt-6 text-[32px] font-semibold text-center">Oops!! Sorry, There is no content here</h4>
        </div>
        `
    return;
  }
  temp.forEach(mainItem => {
    const authors = mainItem.authors;
    const profilePictures = authors.map(author => author.profile_picture);
    const subPictures = mainItem.thumbnail;
    const view = mainItem.others.views;
    const postedDate = mainItem.others.posted_date;
    const title = mainItem.title;
    
    const tempProfile = document.createElement('div');
    tempProfile.classList = `card card-compact bg-base-100 shadow-none`;
    tempProfile.innerHTML = `
        <figure class="relative"><img src="${subPictures}" alt="Profile Picture" class='w-full h-[300px] rounded-[8px]'/>
        
          ${postedDate !== "" ? `<span class="absolute bottom-[12px] right-[12px] bg-[#171717] py-1 px-2 rounded-[8px] text-white">
          ${parseInt(postedDate/3600)}hrs ${parseInt((postedDate%3600)/60)}min ago
          </span>` : `<span class="hidden"></span>`
  }
        </figure>
        <div class="card-body grid grid-cols-[60px,1fr]">
        <div class="flex justify-between relative">
        <img src="${profilePictures[0]}" alt="" class="rounded-full w-[40px] h-[40px]">
        
        </div>
        <div>
            <h3 class="card-title text-xl font-bold text-[#171717]">${title}</h3>
            <p class="mt-4 text-sm text-[rgba(23, 23, 23, 0.70)] flex gap-2 ">${authors[0].profile_name} 
            ${authors[0].verified === true ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_11_34)">
                  <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                  <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
                </g>
                <defs>
                  <clipPath id="clip0_11_34">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>` : ''
      }
            </p>   
            <p class="mt-4">${view} views</p>
        </div>            
        </div>
    `;
    videoContainer.appendChild(tempProfile);
  });
}

loadItems(1000);



