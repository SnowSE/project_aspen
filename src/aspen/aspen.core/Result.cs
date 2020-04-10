using System;
using System.Threading.Tasks;
using Aspen.Core.Models;

namespace Aspen.Core
{
    public struct InternalResult<T>
    {
        public bool IsFailure => !IsSucccess;
        public bool IsSucccess { get; }
        public T State { get; }
        public string Error { get; }

        private InternalResult(bool IsSucccess, T state, string error)
        {
            this.IsSucccess = IsSucccess;
            this.State = state;
            this.Error = error;
        }

        public static InternalResult<T> Success<T>(T state) => new InternalResult<T>(true, state, null);
        public static InternalResult<T> Failure(string error) => new InternalResult<T>(false, default(T), error);

    }

    public static class ResultHelper
    {
        public static InternalResult<U> ValidateFunction<U, T>(this T state, Func<T, InternalResult<U>> func)
        {
            return func(state);
        }
        public async static Task<InternalResult<U>> ValidateFunction<U, T>(this T state, Func<T, Task<InternalResult<U>>> func)
        {
            return await func(state);
        }

        public static InternalResult<U> Apply<U, T>(this InternalResult<T> result, Func<T, InternalResult<U>> func)
        {
            if (result.IsSucccess)
            {
                return func(result.State);
            }
            else
            {
                return InternalResult<U>.Failure(result.Error);
            }
        }

        public static async Task<InternalResult<U>> ApplyAsync<U, T>(this InternalResult<T> result, Func<T, Task<InternalResult<U>>> func)
        {
            if (result.IsSucccess)
            {
                return await func(result.State);
            }
            else
            {
                return InternalResult<U>.Failure(result.Error);
            }
        }

        public static async Task<InternalResult<U>> ApplyAsync<U, T>(this Task<InternalResult<T>> task, Func<T, Task<InternalResult<U>>> func)
        {
            await task;
            if (task.Result.IsSucccess)
            {
                return await func(task.Result.State);
            }
            else
            {
                return InternalResult<U>.Failure(task.Result.Error);
            }
        }

        public static async Task<ApiResult> ReturnApiResult<T>(this Task<InternalResult<T>> task)
        {
            await task;
            if (task.Result.IsSucccess)
            {
                return ApiResult.Success(task.Result.State);
            }
            else
            {
                return ApiResult.Failed(task.Result.Error);
            }
        }
    }
}