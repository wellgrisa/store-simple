export default function (source) {
  return {
    FETCH_REQUEST : `FETCH_REQUEST_${source}`,
    FETCH_SUCCESS : `FETCH_SUCCESS_${source}`,
    FETCH_FAIL : `FETCH_FAIL_${source}`,
    ALL : `ALL_${source}`,
    SAVE : `SAVE_${source}`,
  }
}
