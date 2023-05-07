import { useEffect } from "react";
import CreatePost from "./sub/CreatePost";
import { useAppDispatch } from "../../../store/store";
import { getAllPost, postSelector } from "../../../store/slice/postSlice";
import { useSelector } from "react-redux";
import { backendUrl, postPath } from "../../../services/backend_api_path";
import { getDateFormatt, getTimeFormatt } from "../../../modules/dateModule";

export default function Home() {
  const dispatch = useAppDispatch();
  const post_arr = useSelector(postSelector).post_arr;

  useEffect(() => {
    dispatch(getAllPost(localStorage.getItem("user_id")));
  }, []);

  return (
    <div className="labtop:mx-80 lg:mx-60 h-full border-x border-gray-900/5 shadow-sm bg-white/90">
      <div className="px-8 py-3">
        <span className="text-[10px] pt-0.5 pb-1 px-3 rounded-xl shadow-sm text-white bg-dusk-r">
          My Page
        </span>
      </div>
      <div className="lg:px-56 px-10 pt-0 pb-10">
        <div className="mt-4">
          <CreatePost />
        </div>
        <div className="grid grid-cols-1 text-gray-700 gap-6 my-6">
          {post_arr &&
            post_arr.length > 0 &&
            post_arr.map((item, index) => (
              <div key={index} className={""}>
                <div
                  className={`ring-1 ring-gray-300 cursor-pointer hover:scale-[1.02] duration-200 ${
                    item.img ? "h-fit" : "h-fit"
                  } rounded-xl overflow-hidden shadow`}
                >
                  {item.img && (
                    <img
                      src={backendUrl + postPath.STATIC_POST_IMG + item.img}
                      className={
                        item.img ? "w-full h-80 object-cover" : "hidden"
                      }
                    />
                  )}
                  <div className="pt-5 px-5 mt-1 text-sm h-full flex">
                    {/* <i className="bx bx-message-square-dots text-[38px] text-azur-m mr-2 h-fit"></i> */}
                    <textarea
                      readOnly
                      value={item.content}
                      className="w-full h-24 ring-2 ring-gray-200 p-2.5 bg-gray-100 rounded-lg overflow-hidden"
                    />
                  </div>
                  <div className="px-5 pb-2 mt-1 flex justify-between">
                    <p className="mt-2 text-xs text-gray-400 font-semibold">
                      {getTimeFormatt(item.createdAt)}
                    </p>
                    <p className="mt-2 text-xs text-gray-400 font-semibold">
                      {getDateFormatt(item.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
