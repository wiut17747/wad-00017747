using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Repositories;

public interface IRecipeRepository
{
    Task<Recipe> GetRecipe(int id);
    Task<IEnumerable<Recipe>> GetRecipes();
    Task<Recipe> CreateRecipe(Recipe recipe);
    Task<bool> DeleteRecipe(int id);
}

public class RecipeRepository : IRecipeRepository
{
    public readonly AppDbContext _context;

    public RecipeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Recipe>> GetRecipes()
    {
        return await _context.Recipes.ToListAsync();
    }

    public async Task<Recipe> CreateRecipe(Recipe recipe)
    {
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task<bool> DeleteRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe == null)
            return false;

        _context.Recipes.Remove(recipe);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Recipe> GetRecipe(int id)
    {
        return await _context.Recipes.FindAsync(id);
    }
}